-- Adiciona UNIQUE constraint em whatsapp_messages.message_id para eliminar
-- race condition no dedup do webhook. NULL values não são considerados duplicatas
-- no Postgres, então mensagens sem message_id continuam funcionando normalmente.
CREATE UNIQUE INDEX IF NOT EXISTS whatsapp_messages_message_id_key
  ON whatsapp_messages (message_id)
  WHERE message_id IS NOT NULL;
