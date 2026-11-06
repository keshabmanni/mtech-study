-- 1. Optimization Theory (MCS 651)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals
) VALUES (
    'MCS 651',
    'Optimization Theory',
    2,
    48,
    16,
    0,
    'Asst. Prof. Sanjiv Regmi',
    'Research Asst. Narendra Bahadur Shahi',
    '[
      {"unit_no": 1, "unit_title": "Introduction", "hours": 4, "chapters": ["Introduction to Optimization", "Types of Optimization: Linear, Non-Linear, Convex, Non-Convex", "Application of Optimization in Data Science"]},
      {"unit_no": 2, "unit_title": "Optimization Using Calculus", "hours": 6, "chapters": ["Introduction to Local Extrema and Global Extrema", "Optimization Techniques for Univariate Functions", "Optimization Techniques for Multi-Variate Functions"]},
      {"unit_no": 3, "unit_title": "Linear Programming", "hours": 10, "chapters": ["Concept of Linear Programming", "Simplex Method", "Duality Theorem"]},
      {"unit_no": 4, "unit_title": "Integer Programming", "hours": 6, "chapters": ["Introduction to Integer Programming", "Types of Integer Programming Problem", "Gomory''s All Integer Cutting Plane Method", "Branch and Bound Method"]},
      {"unit_no": 5, "unit_title": "Network Optimization", "hours": 10, "chapters": ["Introduction", "Transportation Problem", "Assignment Problem", "Travelling Sales-Man Problem"]},
      {"unit_no": 6, "unit_title": "Non-Linear Optimization", "hours": 12, "chapters": ["Introduction to Non-Linear Optimization", "Unconstrained Optimization (One variable and Multi-Variable)", "Convex Set and Functions", "Convex Optimization", "Non-Convex Optimization"]}
    ]',
    '["Use of TORA Software in Optimization", "Use of Python Libraries in Optimization"]'
);

-- 2. Statistics and Probability (MCS 652)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals
) VALUES (
    'MCS 652',
    'Statistics and Probability',
    2,
    48,
    16,
    0,
    'Ramesh Prasad Tharu',
    NULL,
    '[
      {"unit_no": 1, "unit_title": "Descriptive Statistics", "hours": 6, "chapters": ["Nominal, Ordinal, Ratio and Scale Data", "Measures of Central Values, Variation, Skewness, Kurtosis", "Graphical Representation of Scale Data using Stem-and-Leaf Plot, Frequency Curve, Histogram, Boxplot, Scatter Plot"]},
      {"unit_no": 2, "unit_title": "Probability", "hours": 8, "chapters": ["Random Experiment, Sample Space, Events, Trials", "Classical, Empirical, Subjective and Axiomatic Approaches of Probability", "Mutual Exclusiveness of Events, Independence of Events, Addition Rule", "Conditional Probability, Multiplication Rule", "Partition of Sample Space, Total Probability Rule", "Bayes'' Rule"]},
      {"unit_no": 3, "unit_title": "Distribution of Random Variables", "hours": 10, "chapters": ["Random Variables - Discrete and Continuous", "Probability Functions of Random Variables", "Expectation and Variance of Random Variables", "Moments of Random Variables and Moment Generating Function", "Discrete Probability Distributions - Uniform, Binomial, Poisson, Geometric, Hypergeometric Distributions", "Continuous Probability Distributions - Uniform, Normal, Exponential, Gamma Distributions"]},
      {"unit_no": 4, "unit_title": "Inferential Statistics", "hours": 12, "chapters": ["Sampling Distributions - Chi^2, t and F Distributions", "Parameter Estimation - Method of Moments, Method of Maximum Likelihood", "Interval Estimation and Test of Hypothesis Concerning Mean of a Normal Population", "Test of Hypothesis - Neyman-Pearson Lemma, Likelihood Ratio Test", "Interval Estimation and Test of Hypothesis Concerning Variance of a Normal Population", "Interval Estimation and Test of Hypothesis Concerning Difference in Means of Two Normal Populations (Both Independent and Dependent Samples)", "Interval Estimation and Test of Hypothesis Concerning Ratio of Variances of Two Normal Populations", "ANOVA", "p-value of a Test"]},
      {"unit_no": 5, "unit_title": "Bivariate Probability Distributions", "hours": 6, "chapters": ["Joint Probability Mass Function, Marginal Probability Mass Function, Conditional Probability Mass Function", "Joint Probability Density Function, Marginal Probability Density Function, Conditional Probability Density Function", "Expectation, Variance and Covariance of Bivariate Random Variables"]},
      {"unit_no": 6, "unit_title": "Correlation and Regression", "hours": 6, "chapters": ["Measure of Correlation of Bivariate Random Variables - Pearson''s Correlation Coefficient, Spearman''s Rank Correlation, Test of Significance of Correlation", "Simple Linear / Non-Linear Regression", "Multiple Linear Regression", "Test of Significance of Regression Coefficients", "Test of Significance of Regression Model", "Measure of Accuracy of Regression Models - MSE, MAE, MAPE, R-Square, Adjusted R-Square"]}
    ]',
    '[
      "Obtain statistical values of numerical data using MS-Excel/STATA/R/SPSS",
      "Obtain frequency distribution/relative frequency/cumulative-frequency distribution of categorical data",
      "Bin continuous data and obtain frequency distribution",
      "Graphing categorical data- bar plot, pie chart, line graph",
      "Graphing continuous data- histogram, stem-and-leaf plot, boxplot",
      "Develop probability distribution of discrete random variable",
      "Obtain probabilities related to binomial, Poisson and normal distributions",
      "Fitting of binomial, Poisson and normal distributions",
      "Test of hypothesis on mean of a normal population",
      "Test of hypothesis on difference in means of two normal populations (dependent and independent samples)",
      "Test of hypothesis on variance of a normal population",
      "Test of hypothesis on ratio of variance of two normal populations",
      "Develop joint probability distribution and marginal distributions of two-dimensional discrete random variables",
      "Obtain correlation between two samples",
      "Carry simple linear/non-linear regression",
      "Carry multiple linear regression"
    ]'
);

-- 3. Software Project Management (MCS 653)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals
) VALUES (
    'MCS 653',
    'Software Project Management',
    2,
    48,
    16,
    0,
    'Sr. Asst. Prof. Chaturbhuj Bhatt',
    'Asst. Prof. Naman Verma',
    '[
      {"unit_no": 1, "unit_title": "Introduction of software Project Management", "hours": 8, "chapters": ["Projects and Project Characteristics", "Project Constraints", "Problems with Software Projects", "Software Project Failures & Major Reasons", "Software Project Management", "Project Management Framework", "Project Stakeholders", "Project Organization Types", "Project Charter"]},
      {"unit_no": 2, "unit_title": "Project Planning", "hours": 8, "chapters": ["Definition Planning", "Planning Tasks", "Work Breakdown Structure (WBS)", "Activity Planning", "Activity Sequencing", "Time Scheduling", "Gantt Chart", "PERT/CPM", "SQA and Test Plan", "Resource Plan", "Communication Plan", "Project Monitoring and Control", "Earned Value Analysis"]},
      {"unit_no": 3, "unit_title": "Software Effort Estimation", "hours": 8, "chapters": ["Software Effort Estimation", "Need for Software Estimation", "Software Estimation Process", "Software Estimation Techniques", "Expert Judgment based Estimation", "LOC, Function Point and Object point Analysis", "COCOMO cost estimation method"]},
      {"unit_no": 4, "unit_title": "Project Risk Management", "hours": 8, "chapters": ["Risk Identification", "Top 10 Software Project Risks", "Risk Analysis and Prioritization", "Risk Response Planning", "Risk Resolution", "Risk Tracking and Control"]},
      {"unit_no": 5, "unit_title": "Human Factors and Leadership Team Organization, Contract Management", "hours": 8, "chapters": ["Motivation", "Communication", "Handling Difficult People", "Leadership and health safety", "Conflict resolution", "Introduction to contract management and types of contracts", "Stages on contract, placement, typical terms of a contract, contract management, acceptance"]},
      {"unit_no": 6, "unit_title": "SOFTWARE QUALITY", "hours": 8, "chapters": ["Software Quality - Quality Measures - FURPS", "Software Quality Assurance", "Software Reviews - Format Technical Review (FTR)", "Formal Approaches to SQA - Software Reliability", "Introduction to SQA - The Software Quality Assurance Plan", "Clean room Methodology"]}
    ]',
    '[
      "Review of 3 fictions proposal, review of Software requirement specification (SRS). Students are asked to develop the proposal and SRS.",
      "Compare and contrast the different types of SDLC",
      "Develop and design the project planning.",
      "Develop detailed activity networks and schedules (CPM/PERT)",
      "Testing tools."
    ]'
);

-- 4. Data Mining and Warehouse (MCS 654)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals
) VALUES (
    'MCS 654',
    'Data Mining and Warehouse',
    2,
    48,
    16,
    0,
    'Dr. Niraj K.C',
    NULL,
    '[
      {"unit_no": 1, "unit_title": "Introduction", "hours": 6, "chapters": ["Introduction to Data Mining", "Importance of Data Mining", "Data Mining functionalities", "Classification of Data Mining Systems", "Data mining architecture", "Major Issues in Data Mining", "Applications of Data Mining", "Social Impacts of Data Mining"]},
      {"unit_no": 2, "unit_title": "Data warehouse", "hours": 6, "chapters": ["Introduction to Data Warehouse and OLAP Technology for Data Mining", "Multidimensional data Model", "Data Warehouse Data Model", "Data Warehouse Architecture", "Data Warehouse Implementation", "Development of Data Cube Technology", "From Data warehousing to Data Mining"]},
      {"unit_no": 3, "unit_title": "Data Cleaning", "hours": 9, "chapters": ["Matrix-Chain Multiplication", "Elements of Dynamic Programming", "Longest Common Subsequence", "0/1 Knapsack problem", "Traveling Salesman problem", "Data Preprocessing", "Data cleaning", "Data Integration and Transformation: standardization, normalisation, smoothing, aggregation, generalization", "Data reduction: Data Cube Aggregation, Dimensionality reduction, Numerosity Reduction, Discretization, and Concept Hierarchy Generation", "Data Mining primitives", "Languages and System Architectures", "Concept Description: Characterization and Comparison, Analytical Characterization, Mining Class Comparison", "Representing input data and output knowledge: Visualization techniques", "Guidelines for Successful Data Mining"]},
      {"unit_no": 4, "unit_title": "Association rule in data mining", "hours": 8, "chapters": ["Association Rule Mining", "Mining of single-dimensional Boolean association rules", "Multilevel association rules and Multidimensional association rules", "Correlation Analysis", "Constraint-based association Mining"]},
      {"unit_no": 5, "unit_title": "Classification and Predication", "hours": 7, "chapters": ["Basic issues regarding classification and predication", "Classification by Decision Tree", "Bayesian classification", "Classification by back propagation", "Associative classification", "Prediction", "Classifier accuracy"]},
      {"unit_no": 6, "unit_title": "Cluster Analysis", "hours": 7, "chapters": ["Cluster Analysis", "Basic issues", "Clustering using partitioning methods", "Hierarchical methods", "Density-based methods", "Grid-based methods and model-based methods", "Algorithms for outlier analysis"]},
      {"unit_no": 7, "unit_title": "Mining Complex Types of Data", "hours": 5, "chapters": ["Multidimensional analysis and descriptive mining of complex data objects", "Introduction to spatial mining, multimedia mining, temporal mining, text mining and web mining with related algorithms"]}
    ]',
    '[
      "Install and explore data mining tools (e.g., Weka, RapidMiner, or Python libraries like scikit-learn). Load a sample dataset (e.g., Iris or Titanic) and generate basic summary statistics.",
      "Design a star schema for a retail sales data warehouse. Implement it using SQL and perform OLAP queries (e.g., roll-up, drill-down) using a database tool like PostgreSQL or MySQL.",
      "Preprocess a noisy dataset (e.g., Kaggle''s House Prices dataset) by handling missing values, normalizing data, and discretizing continuous attributes using Python libraries.",
      "Implement the Apriori algorithm in Python to mine association rules from a market basket dataset (e.g., Kaggle''s Grocery dataset).",
      "Develop a decision tree and Bayesian classifier for a dataset (e.g., UCI''s Breast Cancer dataset) using scikit-learn. Compare their performance using cross-validation.",
      "Implement K-means and DBSCAN clustering on a dataset (e.g., UCI''s Mall Customers dataset). Identify outliers using Isolation Forest. Visualize clusters using Python.",
      "Perform text mining on a dataset (e.g., Twitter sentiment dataset) using Python''s NLTK or spaCy. Extract topics using LDA and visualize word clouds. Optionally, explore web scraping for data collection."
    ]'
);

-- 5. Project Development (MCS 655)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals, project_implementation_guidelines, project_report_guidelines
) VALUES (
    'MCS 655',
    'Project Development',
    2,
    0,
    0,
    48,
    'Asst. Prof. Prakash Gupta',
    NULL,
    '[]',
    '[]',
    '[
      {"section_no": "Section 1", "section_title": "Planning and Scope", "guidelines": ["Clearly define project objectives, scope, and expected outcomes", "Prepare a project proposal including problem statement, motivation, literature survey, methodology, and expected deliverables", "Break the project into phases: requirement analysis, design, development, testing, and documentation"]},
      {"section_no": "Section 2", "section_title": "Technology and Tools", "guidelines": ["Select appropriate programming languages, frameworks, and platforms", "Use database management systems if required (SQL/NoSQL)", "Incorporate version control (e.g., Git/GitHub) for collaborative development", "Consider cloud services or virtualization tools if relevant for deployment or testing"]},
      {"section_no": "Section 3", "section_title": "Design & Architecture", "guidelines": ["Use UML diagrams (Class, Sequence, Activity, Use Case) to describe system design", "Prepare data flow diagrams (DFD), ER diagrams, and database schema if applicable", "Clearly define module responsibilities and interfaces", "Include considerations for scalability, maintainability, and performance optimization"]},
      {"section_no": "Section 4", "section_title": "Development & Coding Standards", "guidelines": ["Follow modular coding practices with proper naming conventions", "Comment the code adequately for clarity and maintainability", "Implement error handling and logging mechanisms", "Follow best practices in security, data handling, and resource management"]},
      {"section_no": "Section 5", "section_title": "Testing & Quality Assurance", "guidelines": ["Perform unit testing, Integration testing, system testing, and user acceptance testing (UAT)", "Maintain a test plan with test cases, expected results, and actual results", "Include performance testing and optimization where relevant", "Document bugs, fixes, and improvements in a test log"]},
      {"section_no": "Section 6", "section_title": "Project Deliverables", "guidelines": ["Working software or research prototype", "Source code, well-commented and version-controlled", "User manual or installation guide if applicable", "Final report and presentation slides"]}
    ]',
    '[
      {"section_no": "Section 5.1", "section_title": "Front Matter", "details": ["Title page with project title, student names, roll numbers, supervisors, department, and university", "Acknowledgements (optional)", "Abstract (150-250 words summarizing the project objectives, methods, results, and conclusions)"]},
      {"section_no": "Section 5.2", "section_title": "Table of Contents", "details": ["Include list of figures, tables, and abbreviations"]},
      {"section_no": "Section 5.3", "section_title": "Introduction", "details": ["Background and context of the project", "Motivation and significance of the problem", "Objectives and scope of the project"]},
      {"section_no": "Section 5.4", "section_title": "Literature Review", "details": ["Discuss previous work and related research", "Highlight gaps or limitations that your project addresses", "Include citations in standard formats (APA, IEEE, or university guideline)"]},
      {"section_no": "Section 5.5", "section_title": "Requirement Analysis", "details": ["Functional and non-functional requirements", "System specifications and constraints", "Use Use Case Diagrams or Requirement Tables where necessary"]},
      {"section_no": "Section 5.6", "section_title": "System Design", "details": ["High-level and detailed design of the system", "Architectural diagrams (UML, DFD, ER diagrams)", "Database design, schemas, and data flow"]},
      {"section_no": "Section 5.7", "section_title": "Implementation", "details": ["Programming languages, tools, and libraries used", "Description of modules and workflow", "Key algorithms, data structures, or methodologies implemented", "Screenshots, flowcharts, or pseudo-code for clarity"]},
      {"section_no": "Section 5.8", "section_title": "Testing and Validation", "details": ["Test plan and test cases", "Testing methods: unit, integration, system, acceptance", "Observations, bug fixes, and validation results", "Performance metrics (if applicable)"]},
      {"section_no": "Section 5.9", "section_title": "Results and Discussion", "details": ["Present outcomes of the project", "Discuss performance, accuracy, efficiency, or usability", "Compare with baseline or expected outcomes", "Include charts, graphs, tables, or screenshots for evidence"]},
      {"section_no": "Section 5.10", "section_title": "Conclusion and Future Work", "details": ["Summarize achievements and lessons learned", "Limitations of the current work", "Recommendations and scope for future enhancements"]},
      {"section_no": "Section 5.11", "section_title": "References", "details": ["List all cited books, papers, websites, and other resources in IEEE/APA format"]},
      {"section_no": "Section 5.12", "section_title": "Appendices", "details": ["Source code (optional if too large), configuration files, additional diagrams", "User manual or deployment instructions"]}
    ]'
);

-- 6. Advanced Database Management System (MCS 657)[cite: 2]
INSERT INTO subjects (
    subject_code, subject_name, semester, theory_total_hours, practical_total_hours, project_total_hours, professor_1, professor_2, theory_units, practicals
) VALUES (
    'MCS 657',
    'Advanced Database Management System',
    2,
    48,
    16,
    0,
    'Asst. Prof. Prakash Gupta',
    NULL,
    '[
      {"unit_no": 1, "unit_title": "Enhanced Entity-Relationship (EER) Model", "hours": 5, "chapters": ["Entity-Relationship Model Revised", "Subclasses, Superclasses, and Inheritance", "Specialization and Generalization", "Constraints and Characteristics of Specialization and Generalization Hierarchies", "Representing Specialization and Generalization in UML Class Diagrams", "Data Abstraction, Knowledge Representation, and Ontology Concepts"]},
      {"unit_no": 2, "unit_title": "Object and Object-Relational Databases", "hours": 6, "chapters": ["Overview of Object Database Concepts", "Object Database Extensions to SQL", "The ODMG Object Model and the Object Definition Language ODL", "Object Database Conceptual Design", "Object Query Language OQL", "Language Binding"]},
      {"unit_no": 3, "unit_title": "File Structures and Indexing", "hours": 8, "chapters": ["Heap Files", "Sorted Files", "Hashing Techniques", "Types of Single-Level Ordered Indexes", "Multilevel Indexes", "Dynamic Multilevel Indexes Using B-Trees and B+-Trees", "Indexes on Multiple Keys", "Other Types of Indexes", "Some General Issues Concerning Indexing", "Physical Database Design in Relational Databases"]},
      {"unit_no": 4, "unit_title": "Query Processing and Optimization", "hours": 6, "chapters": ["Translating SQL Queries into Relational Algebra and Other Operators", "Query Trees and Heuristics for Query Optimization", "Cost-Based Query Optimization"]},
      {"unit_no": 5, "unit_title": "Distributed Database Concepts", "hours": 6, "chapters": ["Distributed Database Concepts", "Data Fragmentation, Replication, and Allocation Techniques for Distributed Database Design", "Types of Distributed Database Systems", "Distributed Database Architectures", "Distributed Catalog Management"]},
      {"unit_no": 6, "unit_title": "NoSQL Databases and BigData", "hours": 10, "chapters": ["Introduction to NOSQL Systems", "The CAP Theorem", "Document-Based NOSQL Systems", "NOSQL Key-Value Stores", "Column-Based or Wide Column NOSQL Systems", "NOSQL Graph Databases", "What Is Big Data?", "Introduction to MapReduce"]},
      {"unit_no": 7, "unit_title": "Information Retrieval and Web Search", "hours": 7, "chapters": ["Information Retrieval (IR) Concepts", "Retrieval Models", "Types of Queries in IR Systems", "Text Preprocessing", "Inverted Indexing", "Evaluation Measures of Search Relevance", "Web Search and Analysis", "Trends in Information Retrieval"]}
    ]',
    '[
      "Learn to use drawing tool to draw ER and EER models",
      "Implement object-oriented and object-relational databases",
      "Learn to create indexes in databases",
      "Implement distributed database",
      "Learn to use NoSQL database such as MongoDB and big data system such as Hadoop",
      "Implement information retrieval and web search concepts"
    ]'
);