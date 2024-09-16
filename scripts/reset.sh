#!/usr/bin/env bash
export PGUSER=postgres
export PGPASSWORD=hackme
export PGHOST=localhost

echo Removing migrations
rm -rf drizzle
echo "Dropping db"

dropdb -f --if-exists opengifame
echo "Creating db"
createdb opengifame

source .env.development
bun run db:generate
bun run db:push

rm /srv/dev/opengifame/working/uploads/* -rfv
# # bun run src/db/migrate.ts
# bun run ./src/server/db/scripts/seed.ts
# bun run ./src/server/db/scripts/auth.ts
