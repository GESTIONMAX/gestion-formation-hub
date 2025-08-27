#!/bin/bash

echo "🔄 Mise à jour des imports..."

find . -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i \
  -e 's#@/app/_lib/types#@/lib/types#g' \
  -e 's#@/app/_lib/hooks#@/hooks#g' \
  -e 's#@/app/_lib/api#@/lib/api#g' \
  -e 's#@/app/_lib#@/lib#g' \
  -e 's#@/app/components/ui#@/components/ui#g' \
  {} +

echo "✅ Imports mis à jour : '@/app/_lib/*' → '@/lib/*', '@/app/components/ui' → '@/components/ui'"
