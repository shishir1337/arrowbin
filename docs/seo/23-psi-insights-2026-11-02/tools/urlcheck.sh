#!/bin/sh
# usage: urlcheck.sh BASE  -> status, location, link header per URL
while IFS= read -r u; do
  h=$(curl -s -o /dev/null -D - "$1$u")
  st=$(printf "%s" "$h" | head -1 | awk '{print $2}')
  loc=$(printf "%s" "$h" | grep -i "^location:" | tr -d '\r' | cut -c11-)
  link=$(printf "%s" "$h" | grep -i "^link:" | tr -d '\r' | cut -c7- | cut -c1-60)
  printf "%-48s %s %s %s\n" "$u" "$st" "$loc" "$link"
done < "$(dirname "$0")/urls.txt"
