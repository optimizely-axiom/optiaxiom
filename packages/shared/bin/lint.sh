set -e

e_flag="--fix" p_flag="-w"
[ "$1" = "--no-fix" ] && e_flag= p_flag="-c"
if [ -f eslint.config.js ]; then
  prettier --cache --log-level silent $p_flag .
  eslint --cache --quiet $e_flag .
else
  tsc --noEmit
fi
