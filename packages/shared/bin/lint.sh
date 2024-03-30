e_flag="--fix" p_flag="-w"
[ "$1" = "--no-fix" ] && e_flag= p_flag="-c"
prettier --cache --log-level silent $p_flag .
if [ -f tsconfig.json ]; then
  concurrently --raw "tsc --noEmit" "eslint --cache --quiet $e_flag ."
else
  eslint --cache --quiet $e_flag .
fi
