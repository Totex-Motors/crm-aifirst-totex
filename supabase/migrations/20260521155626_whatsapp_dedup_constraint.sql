CREATE UNIQUE INDEX IF NOT EXISTS whatsapp_messages_message_id_key
  ON whatsapp_messages (message_id)
  WHERE message_id IS NOT NULL;
