"use client";

import { motion } from "framer-motion";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function NewsQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const quiz = {
    question: "What is the capital of Masbate Province?",
    options: ["Masbate City", "Cawayan", "Mobo", "Milagros"],
    correct: 0,
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <HelpCircle className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              News Quiz
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge about Masbate
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
        >
          <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">
            {quiz.question}
          </h3>
          <div className="space-y-3">
            {quiz.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  showResult
                    ? index === quiz.correct
                      ? "bg-green-100 dark:bg-green-900 border-2 border-green-500"
                      : selectedAnswer === index
                      ? "bg-red-100 dark:bg-red-900 border-2 border-red-500"
                      : "bg-gray-100 dark:bg-gray-700"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">{option}</span>
                  {showResult && index === quiz.correct && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === index && index !== quiz.correct && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className={`font-bold text-lg mb-4 ${selectedAnswer === quiz.correct ? "text-green-600" : "text-red-600"}`}>
                {selectedAnswer === quiz.correct ? "Correct! 🎉" : "Incorrect. Try again!"}
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-[#0038A8] text-white rounded-lg hover:bg-[#1E4FC7] transition-colors"
              >
                Try Another Question
              </button>
            </motion.div>
          )}
        </motion.div>
        </div>
      </div>
    </section>
  );
}

