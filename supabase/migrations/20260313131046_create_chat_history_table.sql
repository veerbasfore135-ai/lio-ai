/*
  # Create Chat History Table for Lio A.I

  1. New Tables
    - `chat_history`
      - `id` (uuid, primary key) - Unique identifier for each chat message
      - `user_id` (uuid, foreign key) - References auth.users(id)
      - `message` (text) - The user's message/prompt
      - `response` (text) - The AI's response
      - `created_at` (timestamptz) - When the message was sent
      - `conversation_id` (uuid) - Groups messages in the same conversation

  2. Security
    - Enable RLS on `chat_history` table
    - Add policy for users to read their own chat history
    - Add policy for users to insert their own messages
    - Add policy for users to delete their own chat history
*/

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  response text NOT NULL,
  conversation_id uuid DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history"
  ON chat_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_conversation_id ON chat_history(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON chat_history(created_at DESC);
