"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ContactSubmission } from "@/types";
import { Mail, Check, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ContactsPage() {
  const { admin } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    loadContacts();
  }, [admin, router]);

  const loadContacts = async () => {
    try {
      if (!db) {
        console.warn("Firebase is not configured. Contacts data unavailable.");
        return;
      }
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as ContactSubmission;
      });
      setContacts(contactsData);
    } catch (error) {
      console.error("Error loading contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "contacts", id), { read: true });
      setContacts(contacts.map((c) => (c.id === id ? { ...c, read: true } : c)));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading contacts...</p>
      </div>
    );
  }

  if (!admin) return null;

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {contacts.length} total submissions ({unreadCount} unread)
        </p>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No contact submissions yet.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md ${
                !contact.read ? "border-l-4 border-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{contact.subject}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{contact.name}</span>
                    <span>•</span>
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                    {contact.phone && (
                      <>
                        <span>•</span>
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                          {contact.phone}
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!contact.read && (
                    <button
                      onClick={() => markAsRead(contact.id)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatDate(contact.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

