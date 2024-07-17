set -e

e_flag="--fix" p_flag="--log-level silent -w"
[ "$1" = "--no-fix" ] && e_flag= p_flag="-c"
if [ -f eslint.config.js ]; then
  prettier --cache $p_flag .
  eslint --cache --quiet $e_flag .
else
  tsc --noEmit
fi
