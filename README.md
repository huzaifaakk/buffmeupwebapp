# BUFFMEUP Web Platform

A premium fitness platform for Clients, Trainers, and Admins.

## Setup Instructions

To get this project running on another machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/huzaifaakk/buffmeupwebapp.git
    cd buffmeupwebapp
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup**:
    Run the following SQL scripts in your Supabase SQL Editor:
    
    ### Messages Table
    ```sql
    CREATE TABLE messages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      sender_id UUID REFERENCES profiles(id),
      receiver_id UUID REFERENCES profiles(id),
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    ```

    ### Goals Table
    ```sql
    CREATE TABLE goals (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id),
      title TEXT NOT NULL,
      current_value FLOAT DEFAULT 0,
      target_value FLOAT NOT NULL,
      unit TEXT DEFAULT 'lbs',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    ```

    ### Admin Role Constraint
    ```sql
    ALTER TABLE profiles DROP CONSTRAINT profiles_role_check;
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('client', 'trainer', 'admin'));
    ```

5.  **Run Locally**:
    ```bash
    npm run dev
    ```

## Features
- **Client**: Dashboard, Social Feed, Progress Tracking, Goals, Messaging.
- **Trainer**: Client Management, Messaging, Plan Creation.
- **Admin**: User Management, Content Moderation, Analytics.
