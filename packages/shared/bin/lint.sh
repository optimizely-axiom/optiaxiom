set -e

tsc --build
e_flag="--fix" p_flag="--log-level silent -w"
[ "$1" = "--no-fix" ] && e_flag= p_flag="-c"
if [ -f eslint.config.js ]; then
  prettier --cache $p_flag .
  packages/shared/node_modules/.bin/eslint --cache --quiet $e_flag .
fi
