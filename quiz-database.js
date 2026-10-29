
    const quizDatabase = {

        // =====================================
        // PEMDAS
        // =====================================

        pemdas: {

            intro: [

                {
                    question: "What does the letter P in PEMDAS stand for?",
                    answers: [
                        "Parentheses",
                        "Power",
                        "Product",
                        "Percentage"
                    ],
                    correct: 0
                },

                {
                    question: "Which operation should be performed first in PEMDAS?",
                    answers: [
                        "Addition",
                        "Multiplication",
                        "Parentheses",
                        "Division"
                    ],
                    correct: 2
                },

                {
                    question: "Which operation comes immediately after Parentheses?",
                    answers: [
                        "Addition",
                        "Exponents",
                        "Division",
                        "Subtraction"
                    ],
                    correct: 1
                },

                {
                    question: "In PEMDAS, multiplication and division are solved:",
                    answers: [
                        "Division always first",
                        "Multiplication always first",
                        "From left to right",
                        "From right to left"
                    ],
                    correct: 2
                },

                {
                    question: "Addition and subtraction are solved:",
                    answers: [
                        "Addition first",
                        "Subtraction first",
                        "From left to right",
                        "Whichever gives the larger answer"
                    ],
                    correct: 2
                },

                {
                    question: "Which expression should be simplified first?",
                    answers: [
                        "4 + 5 × 2",
                        "(4 + 5) × 2",
                        "8 ÷ 2 + 1",
                        "7 + 3"
                    ],
                    correct: 1
                },

                {
                    question: "PEMDAS is mainly used to:",
                    answers: [
                        "Find percentages",
                        "Convert fractions",
                        "Determine the correct order of operations",
                        "Solve only equations"
                    ],
                    correct: 2
                },

                {
                    question: "Which pair of operations has equal priority?",
                    answers: [
                        "Parentheses and Exponents",
                        "Multiplication and Division",
                        "Parentheses and Addition",
                        "Exponents and Subtraction"
                    ],
                    correct: 1
                },

                {
                    question: "Which pair of operations is performed last?",
                    answers: [
                        "Multiplication and Division",
                        "Parentheses and Exponents",
                        "Addition and Subtraction",
                        "Exponents and Multiplication"
                    ],
                    correct: 2
                },

                {
                    question: "Why is PEMDAS important?",
                    answers: [
                        "It ensures everyone gets the same correct answer.",
                        "It makes calculations longer.",
                        "It removes the need for brackets.",
                        "It changes mathematical rules."
                    ],
                    correct: 0
                }

            ],
           
            brackets: [

                {
                    question: "Evaluate: (4 + 3)",
                    answers: [
                        "7",
                        "12",
                        "1",
                        "43"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: (10 − 6)",
                    answers: [
                        "16",
                        "4",
                        "6",
                        "5"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: (5 × 4)",
                    answers: [
                        "9",
                        "20",
                        "25",
                        "10"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: (18 ÷ 3)",
                    answers: [
                        "5",
                        "6",
                        "9",
                        "3"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: (8 + 2) × 3",
                    answers: [
                        "14",
                        "30",
                        "24",
                        "18"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 4 × (6 − 2)",
                    answers: [
                        "8",
                        "16",
                        "20",
                        "24"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: (15 − 5) ÷ 2",
                    answers: [
                        "10",
                        "20",
                        "5",
                        "2"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 7 + (12 ÷ 4)",
                    answers: [
                        "10",
                        "9",
                        "11",
                        "13"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: (3 + 5) × (2 + 1)",
                    answers: [
                        "11",
                        "24",
                        "16",
                        "18"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: (20 − 8) + (9 − 4)",
                    answers: [
                        "15",
                        "16",
                        "17",
                        "18"
                    ],
                    correct: 2
                }

            ],
            
            exponents: [

                {
                    question: "Evaluate: 2²",
                    answers: [
                        "2",
                        "4",
                        "8",
                        "16"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 3²",
                    answers: [
                        "6",
                        "9",
                        "12",
                        "27"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 4²",
                    answers: [
                        "8",
                        "12",
                        "16",
                        "24"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 2³",
                    answers: [
                        "6",
                        "8",
                        "9",
                        "12"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 5²",
                    answers: [
                        "10",
                        "15",
                        "20",
                        "25"
                    ],
                    correct: 3
                },

                {
                    question: "Evaluate: 2² + 3",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 10 − 3²",
                    answers: [
                        "1",
                        "3",
                        "7",
                        "9"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: 2 × 3²",
                    answers: [
                        "12",
                        "18",
                        "9",
                        "6"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: (2 + 3)²",
                    answers: [
                        "10",
                        "20",
                        "25",
                        "32"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 2² + 4²",
                    answers: [
                        "18",
                        "20",
                        "24",
                        "16"
                    ],
                    correct: 1
                }

            ],
            
            operations: [

                {
                    question: "Evaluate: 4 + 3 × 2",
                    answers: [
                        "14",
                        "10",
                        "11",
                        "8"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 18 ÷ 3 + 4",
                    answers: [
                        "10",
                        "8",
                        "6",
                        "12"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: 20 − 6 ÷ 2",
                    answers: [
                        "7",
                        "10",
                        "17",
                        "14"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 5 × 4 − 6",
                    answers: [
                        "14",
                        "20",
                        "26",
                        "16"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: 12 + 8 ÷ 4",
                    answers: [
                        "5",
                        "14",
                        "20",
                        "18"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 9 × 2 + 5",
                    answers: [
                        "23",
                        "28",
                        "18",
                        "19"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: 30 ÷ 5 × 2",
                    answers: [
                        "3",
                        "12",
                        "10",
                        "15"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 16 − 4 × 3",
                    answers: [
                        "36",
                        "0",
                        "12",
                        "4"
                    ],
                    correct: 3
                },

                {
                    question: "Evaluate: 8 + 12 ÷ 3 × 2",
                    answers: [
                        "16",
                        "20",
                        "14",
                        "18"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: 25 − 15 ÷ 3 + 2 × 4",
                    answers: [
                        "12",
                        "20",
                        "28",
                        "18"
                    ],
                    correct: 1
                }

            ],

        },

        // =====================================
        // ALGEBRA
        // =====================================

        algebra: {

            expressions: [

                {
                    question: "Evaluate: x + 5 when x = 3",
                    answers: [
                        "5",
                        "8",
                        "15",
                        "2"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 2x when x = 6",
                    answers: [
                        "8",
                        "10",
                        "12",
                        "14"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 3x + 2 when x = 4",
                    answers: [
                        "12",
                        "14",
                        "16",
                        "18"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 5x − 3 when x = 2",
                    answers: [
                        "5",
                        "7",
                        "9",
                        "10"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: x² when x = 5",
                    answers: [
                        "10",
                        "20",
                        "25",
                        "30"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: x² + 4 when x = 3",
                    answers: [
                        "7",
                        "9",
                        "12",
                        "13"
                    ],
                    correct: 3
                },

                {
                    question: "Evaluate: 4x − 6 when x = 5",
                    answers: [
                        "12",
                        "14",
                        "16",
                        "18"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 2x + 3y when x = 2 and y = 4",
                    answers: [
                        "14",
                        "16",
                        "18",
                        "20"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 6 + 2x − y when x = 4 and y = 3",
                    answers: [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: 3(x + 2) when x = 5",
                    answers: [
                        "18",
                        "20",
                        "21",
                        "24"
                    ],
                    correct: 2
                }

            ],
            
            equations: [

                {
                    question: "Solve: x + 5 = 12",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: x − 4 = 9",
                    answers: [
                        "5",
                        "11",
                        "13",
                        "9"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 2x = 14",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Solve: 3x = 18",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 1
                },

                {
                    question: "Solve: x + 8 = 15",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: x − 7 = 10",
                    answers: [
                        "15",
                        "16",
                        "17",
                        "18"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 5x = 25",
                    answers: [
                        "4",
                        "5",
                        "6",
                        "7"
                    ],
                    correct: 1
                },

                {
                    question: "Solve: 4x + 2 = 18",
                    answers: [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    correct: 1
                },

                {
                    question: "Solve: 2x − 6 = 10",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 3x + 6 = 21",
                    answers: [
                        "4",
                        "5",
                        "6",
                        "7"
                    ],
                    correct: 1
                }

            ],
            
            inequalities: [

                {
                    question: "Which value satisfies x > 6?",
                    answers: [
                        "4",
                        "5",
                        "6",
                        "8"
                    ],
                    correct: 3
                },

                {
                    question: "Which value satisfies x < 10?",
                    answers: [
                        "12",
                        "10",
                        "9",
                        "15"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: x + 4 > 9",
                    answers: [
                        "x > 3",
                        "x > 5",
                        "x > 9",
                        "x > 13"
                    ],
                    correct: 1
                },

                {
                    question: "Solve: x − 6 < 2",
                    answers: [
                        "x < 4",
                        "x < 6",
                        "x < 8",
                        "x < 10"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 2x > 14",
                    answers: [
                        "x > 5",
                        "x > 6",
                        "x > 7",
                        "x > 8"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 3x < 21",
                    answers: [
                        "x < 6",
                        "x < 7",
                        "x < 8",
                        "x < 9"
                    ],
                    correct: 1
                },

                {
                    question: "Which number satisfies x ≥ 12?",
                    answers: [
                        "10",
                        "11",
                        "12",
                        "9"
                    ],
                    correct: 2
                },

                {
                    question: "Which number satisfies x ≤ 5?",
                    answers: [
                        "7",
                        "6",
                        "5",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: x + 2 ≤ 8",
                    answers: [
                        "x ≤ 4",
                        "x ≤ 5",
                        "x ≤ 6",
                        "x ≤ 7"
                    ],
                    correct: 2
                },

                {
                    question: "Solve: 4x ≥ 20",
                    answers: [
                        "x ≥ 3",
                        "x ≥ 4",
                        "x ≥ 5",
                        "x ≥ 6"
                    ],
                    correct: 2
                }

            ],

        },

        // =====================================
        // ALGEBRA 2
        // =====================================

        algebra2: {

           indices: [

                {
                    question: "Evaluate: 2³",
                    answers: [
                        "6",
                        "8",
                        "9",
                        "12"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: 5²",
                    answers: [
                        "10",
                        "20",
                        "25",
                        "30"
                    ],
                    correct: 2
                },

                {
                    question: "Simplify: x² × x³",
                    answers: [
                        "x⁵",
                        "x⁶",
                        "x⁹",
                        "x²"
                    ],
                    correct: 0
                },

                {
                    question: "Simplify: a⁷ ÷ a³",
                    answers: [
                        "a⁴",
                        "a¹⁰",
                        "a²",
                        "a³"
                    ],
                    correct: 0
                },

                {
                    question: "Simplify: (y⁴)²",
                    answers: [
                        "y⁶",
                        "y⁸",
                        "y¹⁶",
                        "y²"
                    ],
                    correct: 1
                },

                {
                    question: "Simplify: 3² × 3³",
                    answers: [
                        "3⁵",
                        "3⁶",
                        "3⁹",
                        "9⁵"
                    ],
                    correct: 0
                },

                {
                    question: "Simplify: m⁶ ÷ m²",
                    answers: [
                        "m³",
                        "m⁴",
                        "m⁸",
                        "m²"
                    ],
                    correct: 1
                },

                {
                    question: "Simplify: (2³)²",
                    answers: [
                        "2⁵",
                        "2⁶",
                        "2⁹",
                        "2¹"
                    ],
                    correct: 1
                },

                {
                    question: "Simplify: p⁵ × p",
                    answers: [
                        "p⁵",
                        "p⁶",
                        "p¹⁰",
                        "p⁴"
                    ],
                    correct: 1
                },

                {
                    question: "Simplify: q⁹ ÷ q⁴",
                    answers: [
                        "q⁴",
                        "q⁵",
                        "q¹³",
                        "q³"
                    ],
                    correct: 1
                }

            ],
            
            logarithms: [

                {
                    question: "Evaluate: log₁₀(100)",
                    answers: [
                        "1",
                        "2",
                        "10",
                        "100"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: log₁₀(1000)",
                    answers: [
                        "2",
                        "3",
                        "10",
                        "100"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: log₂(8)",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "8"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: log₂(16)",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: log₅(25)",
                    answers: [
                        "2",
                        "3",
                        "5",
                        "10"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: log₃(27)",
                    answers: [
                        "2",
                        "3",
                        "6",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Which exponential equation is equivalent to log₂(32) = 5?",
                    answers: [
                        "2⁵ = 32",
                        "5² = 32",
                        "32⁵ = 2",
                        "2³ = 32"
                    ],
                    correct: 0
                },

                {
                    question: "Which logarithmic equation is equivalent to 10³ = 1000?",
                    answers: [
                        "log₁₀(1000) = 3",
                        "log₃(1000) = 10",
                        "log₁₀(3) = 1000",
                        "log₁₀(1000) = 10"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: log₄(16)",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "8"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: log₁₀(1)",
                    answers: [
                        "0",
                        "1",
                        "10",
                        "Undefined"
                    ],
                    correct: 0
                }

            ],
            
            "standard-form": [

                {
                    question: "Write 4,500 in standard form.",
                    answers: [
                        "4.5 × 10³",
                        "45 × 10²",
                        "0.45 × 10⁴",
                        "4.5 × 10²"
                    ],
                    correct: 0
                },

                {
                    question: "Write 0.0062 in standard form.",
                    answers: [
                        "6.2 × 10²",
                        "6.2 × 10⁻²",
                        "6.2 × 10⁻³",
                        "0.62 × 10⁻²"
                    ],
                    correct: 2
                },

                {
                    question: "Convert 3.8 × 10⁴ to ordinary form.",
                    answers: [
                        "3,800",
                        "38,000",
                        "380,000",
                        "380"
                    ],
                    correct: 1
                },

                {
                    question: "Convert 7.5 × 10⁻² to ordinary form.",
                    answers: [
                        "0.075",
                        "0.75",
                        "7.5",
                        "75"
                    ],
                    correct: 0
                },

                {
                    question: "Write 820,000 in standard form.",
                    answers: [
                        "8.2 × 10⁴",
                        "82 × 10⁴",
                        "8.2 × 10⁵",
                        "0.82 × 10⁶"
                    ],
                    correct: 2
                },

                {
                    question: "Write 0.00049 in standard form.",
                    answers: [
                        "4.9 × 10⁻⁴",
                        "4.9 × 10⁻⁵",
                        "49 × 10⁻⁶",
                        "0.49 × 10⁻³"
                    ],
                    correct: 0
                },

                {
                    question: "Convert 9.1 × 10² to ordinary form.",
                    answers: [
                        "91",
                        "910",
                        "9,100",
                        "0.91"
                    ],
                    correct: 1
                },

                {
                    question: "Which number is written correctly in standard form?",
                    answers: [
                        "25 × 10³",
                        "2.5 × 10⁴",
                        "0.25 × 10⁵",
                        "250 × 10²"
                    ],
                    correct: 1
                },

                {
                    question: "Convert 1.2 × 10⁻⁵ to ordinary form.",
                    answers: [
                        "0.000012",
                        "0.00012",
                        "0.0012",
                        "0.012"
                    ],
                    correct: 0
                },

                {
                    question: "Write 56,000,000 in standard form.",
                    answers: [
                        "5.6 × 10⁶",
                        "56 × 10⁶",
                        "5.6 × 10⁷",
                        "0.56 × 10⁸"
                    ],
                    correct: 2
                }

            ],
            
           "decimal-places": [

                {
                    question: "Round 3.4567 to 2 decimal places.",
                    answers: [
                        "3.45",
                        "3.46",
                        "3.47",
                        "3.44"
                    ],
                    correct: 1
                },

                {
                    question: "Round 8.7342 to 3 decimal places.",
                    answers: [
                        "8.734",
                        "8.735",
                        "8.730",
                        "8.740"
                    ],
                    correct: 0
                },

                {
                    question: "Round 12.987 to 1 decimal place.",
                    answers: [
                        "12.9",
                        "13.0",
                        "12.8",
                        "13.1"
                    ],
                    correct: 1
                },

                {
                    question: "Round 5.444 to 2 decimal places.",
                    answers: [
                        "5.45",
                        "5.44",
                        "5.40",
                        "5.50"
                    ],
                    correct: 1
                },

                {
                    question: "Round 9.995 to 2 decimal places.",
                    answers: [
                        "9.99",
                        "10.00",
                        "9.95",
                        "10.05"
                    ],
                    correct: 1
                },

                {
                    question: "Round 0.87654 to 3 decimal places.",
                    answers: [
                        "0.876",
                        "0.877",
                        "0.875",
                        "0.880"
                    ],
                    correct: 1
                },

                {
                    question: "Round 14.249 to 2 decimal places.",
                    answers: [
                        "14.24",
                        "14.25",
                        "14.20",
                        "14.30"
                    ],
                    correct: 1
                },

                {
                    question: "Round 6.5001 to 3 decimal places.",
                    answers: [
                        "6.500",
                        "6.501",
                        "6.510",
                        "6.505"
                    ],
                    correct: 0
                },

                {
                    question: "Round 123.456789 to 4 decimal places.",
                    answers: [
                        "123.4567",
                        "123.4568",
                        "123.4570",
                        "123.4569"
                    ],
                    correct: 1
                },

                {
                    question: "Round 0.00494 to 3 decimal places.",
                    answers: [
                        "0.004",
                        "0.005",
                        "0.0049",
                        "0.006"
                    ],
                    correct: 1
                }

            ],

        },

        // =====================================
        // STATISTICS
        // =====================================

        statistics: {

            mean: [

                {
                    question: "Find the mean of: 2, 4, 6",
                    answers: [
                        "3",
                        "4",
                        "5",
                        "6"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 5, 7, 9",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 8, 10, 12, 14",
                    answers: [
                        "10",
                        "11",
                        "12",
                        "13"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 4, 6, 8, 10, 12",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 2
                },

                {
                    question: "Find the mean of: 15, 20, 25",
                    answers: [
                        "18",
                        "20",
                        "22",
                        "25"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 3, 5, 7, 9",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 11, 13, 15, 17",
                    answers: [
                        "13",
                        "14",
                        "15",
                        "16"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 6, 8, 10, 12, 14",
                    answers: [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 20, 30, 40, 50",
                    answers: [
                        "30",
                        "35",
                        "40",
                        "45"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mean of: 9, 11, 13, 15, 17",
                    answers: [
                        "11",
                        "12",
                        "13",
                        "14"
                    ],
                    correct: 2
                }

            ],
            
            median: [

                {
                    question: "Find the median of: 2, 4, 6",
                    answers: [
                        "2",
                        "4",
                        "6",
                        "5"
                    ],
                    correct: 1
                },

                {
                    question: "Find the median of: 3, 5, 7, 9, 11",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Find the median of: 6, 8, 10, 12",
                    answers: [
                        "8",
                        "9",
                        "10",
                        "11"
                    ],
                    correct: 1
                },

                {
                    question: "Find the median of: 1, 3, 5, 7, 9, 11, 13",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 2
                },

                {
                    question: "Find the median of: 10, 12, 14, 16",
                    answers: [
                        "12",
                        "13",
                        "14",
                        "15"
                    ],
                    correct: 1
                },

                {
                    question: "Find the median of: 4, 8, 12, 16, 20",
                    answers: [
                        "8",
                        "10",
                        "12",
                        "16"
                    ],
                    correct: 2
                },

                {
                    question: "Find the median of: 5, 10, 15, 20, 25, 30",
                    answers: [
                        "15",
                        "17.5",
                        "20",
                        "22.5"
                    ],
                    correct: 1
                },

                {
                    question: "Find the median of: 7, 9, 11, 13, 15",
                    answers: [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    correct: 2
                },

                {
                    question: "Find the median of: 2, 4, 6, 8, 10, 12",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Find the median of: 14, 16, 18, 20, 22",
                    answers: [
                        "16",
                        "18",
                        "20",
                        "22"
                    ],
                    correct: 1
                }

            ],
            
           mode: [

                {
                    question: "Find the mode of: 2, 3, 3, 4, 5",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "5"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mode of: 6, 7, 7, 7, 8, 9",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mode of: 5, 5, 6, 7, 8",
                    answers: [
                        "5",
                        "6",
                        "7",
                        "8"
                    ],
                    correct: 0
                },

                {
                    question: "Find the mode of: 10, 11, 12, 12, 13",
                    answers: [
                        "10",
                        "11",
                        "12",
                        "13"
                    ],
                    correct: 2
                },

                {
                    question: "Find the mode of: 4, 4, 4, 6, 8",
                    answers: [
                        "4",
                        "6",
                        "8",
                        "No mode"
                    ],
                    correct: 0
                },

                {
                    question: "Find the mode of: 9, 10, 10, 11, 12",
                    answers: [
                        "9",
                        "10",
                        "11",
                        "12"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mode of: 15, 15, 16, 17, 18",
                    answers: [
                        "15",
                        "16",
                        "17",
                        "18"
                    ],
                    correct: 0
                },

                {
                    question: "Find the mode of: 2, 2, 3, 3, 4",
                    answers: [
                        "2 only",
                        "3 only",
                        "2 and 3",
                        "4"
                    ],
                    correct: 2
                },

                {
                    question: "Find the mode of: 20, 21, 21, 22, 23",
                    answers: [
                        "20",
                        "21",
                        "22",
                        "23"
                    ],
                    correct: 1
                },

                {
                    question: "Find the mode of: 8, 9, 9, 9, 10, 11",
                    answers: [
                        "8",
                        "9",
                        "10",
                        "11"
                    ],
                    correct: 1
                }

            ],
            
            probability: [

                {
                    question: "A bag contains 3 red balls and 2 blue balls. One ball is chosen at random. What is the probability of choosing a red ball?",
                    answers: [
                        "2/5",
                        "3/5",
                        "1/2",
                        "4/5"
                    ],
                    correct: 1
                },

                {
                    question: "A bag contains 4 green balls and 6 yellow balls. One ball is chosen at random. What is the probability of choosing a green ball?",
                    answers: [
                        "2/5",
                        "3/5",
                        "4/5",
                        "1/5"
                    ],
                    correct: 0
                },

                {
                    question: "A bag contains 5 white balls and 5 black balls. One ball is chosen at random. What is the probability of choosing a black ball?",
                    answers: [
                        "1/5",
                        "1/2",
                        "2/5",
                        "3/5"
                    ],
                    correct: 1
                },

                {
                    question: "A bag contains 7 red balls and 3 blue balls. One ball is chosen at random. What is the probability of choosing a blue ball?",
                    answers: [
                        "3/10",
                        "7/10",
                        "1/3",
                        "3/7"
                    ],
                    correct: 0
                },

                {
                    question: "A bag contains 8 orange balls and 2 purple balls. One ball is chosen at random. What is the probability of choosing a purple ball?",
                    answers: [
                        "1/5",
                        "2/5",
                        "4/5",
                        "1/2"
                    ],
                    correct: 0
                },

                {
                    question: "A bag contains 6 red balls, 2 green balls and 2 blue balls. One ball is chosen at random. What is the probability of choosing a green ball?",
                    answers: [
                        "1/10",
                        "1/5",
                        "2/5",
                        "3/10"
                    ],
                    correct: 1
                },

                {
                    question: "A bag contains 9 white balls and 1 black ball. One ball is chosen at random. What is the probability of choosing a white ball?",
                    answers: [
                        "1/10",
                        "9/10",
                        "4/5",
                        "1/2"
                    ],
                    correct: 1
                },

                {
                    question: "A bag contains 4 red balls, 3 blue balls and 3 yellow balls. One ball is chosen at random. What is the probability of choosing a yellow ball?",
                    answers: [
                        "3/10",
                        "4/10",
                        "3/7",
                        "1/3"
                    ],
                    correct: 0
                },

                {
                    question: "A bag contains 2 green balls and 8 red balls. One ball is chosen at random. What is the probability of choosing a red ball?",
                    answers: [
                        "2/10",
                        "4/5",
                        "3/5",
                        "1/5"
                    ],
                    correct: 1
                },

                {
                    question: "A bag contains 5 blue balls, 4 red balls and 1 white ball. One ball is chosen at random. What is the probability of choosing a white ball?",
                    answers: [
                        "1/10",
                        "1/5",
                        "1/4",
                        "2/5"
                    ],
                    correct: 0
                }

            ],

        },

        // =====================================
        // CALCULUS
        // =====================================

        calculus: {

            limits: [

                {
                    question: "Evaluate: lim(x→2) (x + 3)",
                    answers: [
                        "4",
                        "5",
                        "6",
                        "7"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: lim(x→4) (2x)",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "10"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: lim(x→3) (x²)",
                    answers: [
                        "6",
                        "8",
                        "9",
                        "12"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: lim(x→5) (x − 2)",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "5"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: lim(x→2) (x² + 1)",
                    answers: [
                        "4",
                        "5",
                        "6",
                        "7"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: lim(x→1) (3x + 4)",
                    answers: [
                        "6",
                        "7",
                        "8",
                        "9"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: lim(x→3) (2x²)",
                    answers: [
                        "12",
                        "15",
                        "18",
                        "21"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: lim(x→2) ((x² − 4)/(x − 2))",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "Undefined"
                    ],
                    correct: 3
                },

                {
                    question: "Evaluate: lim(x→4) ((x² − 16)/(x − 4))",
                    answers: [
                        "4",
                        "6",
                        "Undefined",
                        "16"
                    ],
                    correct: 2
                },

                {
                    question: "Evaluate: lim(x→1) (x³ + 2)",
                    answers: [
                        "2",
                        "3",
                        "4",
                        "5"
                    ],
                    correct: 1
                }

            ],
            
            differentiation: [

                {
                    question: "Differentiate: x³",
                    answers: [
                        "3x²",
                        "x²",
                        "3x³",
                        "x⁴"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 5x⁴",
                    answers: [
                        "20x³",
                        "5x³",
                        "4x⁵",
                        "25x³"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 7x²",
                    answers: [
                        "7x",
                        "14x",
                        "9x",
                        "14"
                    ],
                    correct: 1
                },

                {
                    question: "Differentiate: 9",
                    answers: [
                        "1",
                        "9",
                        "0",
                        "x"
                    ],
                    correct: 2
                },

                {
                    question: "Differentiate: 6x⁵",
                    answers: [
                        "30x⁴",
                        "36x⁴",
                        "30x⁵",
                        "6x⁴"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 3x⁴ + 2x",
                    answers: [
                        "12x³ + 2",
                        "12x⁴ + 2",
                        "3x³ + 2",
                        "12x³ + x"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: x⁵ − 4x²",
                    answers: [
                        "5x⁴ − 8x",
                        "5x⁴ − 4x",
                        "x⁴ − 8x",
                        "5x⁵ − 8x"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 8x³ + 6",
                    answers: [
                        "24x²",
                        "24x² + 6",
                        "8x²",
                        "24x³"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 4x⁶ − 3x",
                    answers: [
                        "24x⁵ − 3",
                        "24x⁶ − 3",
                        "4x⁵ − 3",
                        "24x⁵ − 1"
                    ],
                    correct: 0
                },

                {
                    question: "Differentiate: 2x⁴ + 5x² − 7",
                    answers: [
                        "8x³ + 10x",
                        "8x⁴ + 10x",
                        "8x³ + 10x − 7",
                        "8x³ + 5x"
                    ],
                    correct: 0
                }

            ],
            
            integration: [

                {
                    question: "Evaluate: ∫3x² dx",
                    answers: [
                        "x³ + C",
                        "3x³ + C",
                        "x² + C",
                        "6x + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫8x dx",
                    answers: [
                        "8x² + C",
                        "4x² + C",
                        "16x + C",
                        "8 + C"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: ∫5 dx",
                    answers: [
                        "5 + C",
                        "5x + C",
                        "x + C",
                        "10x + C"
                    ],
                    correct: 1
                },

                {
                    question: "Evaluate: ∫4x³ dx",
                    answers: [
                        "x⁴ + C",
                        "4x⁴ + C",
                        "12x² + C",
                        "x³ + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫6x⁵ dx",
                    answers: [
                        "x⁶ + C",
                        "6x⁶ + C",
                        "30x⁴ + C",
                        "x⁵ + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫(2x + 3) dx",
                    answers: [
                        "x² + 3x + C",
                        "2x² + 3x + C",
                        "x² + 6x + C",
                        "2x + 3 + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫9x² dx",
                    answers: [
                        "3x³ + C",
                        "9x³ + C",
                        "18x + C",
                        "x³ + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫10x⁴ dx",
                    answers: [
                        "2x⁵ + C",
                        "10x⁵ + C",
                        "5x⁴ + C",
                        "2x⁴ + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫(3x² + 4) dx",
                    answers: [
                        "x³ + 4x + C",
                        "3x³ + 4 + C",
                        "x³ + 4 + C",
                        "6x + 4x + C"
                    ],
                    correct: 0
                },

                {
                    question: "Evaluate: ∫7x⁶ dx",
                    answers: [
                        "x⁷ + C",
                        "7x⁷ + C",
                        "42x⁵ + C",
                        "x⁶ + C"
                    ],
                    correct: 0
                }
                

            ]

        }

    };