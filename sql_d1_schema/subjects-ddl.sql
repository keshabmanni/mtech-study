-- Enable foreign key support
PRAGMA foreign_keys = ON;

CREATE TABLE subjects (
    subject_code TEXT PRIMARY KEY,
    subject_name TEXT NOT NULL,
    semester INTEGER NOT NULL,
    theory_total_hours INTEGER DEFAULT 0,
    practical_total_hours INTEGER DEFAULT 0,
    project_total_hours INTEGER DEFAULT 0,
    professor_1 TEXT NOT NULL DEFAULT 'TBD',
    professor_2 TEXT,
    
    -- Stored as JSON arrays
    theory_units TEXT,                    -- Array of units containing unit_no, unit_title, hours, professor, and chapters
    practicals TEXT,                      -- Array of practical descriptions/tasks
    project_implementation_guidelines TEXT, -- Array of implementation guidelines (for projects)
    project_report_guidelines TEXT        -- Array of report guidelines (for projects)
);

