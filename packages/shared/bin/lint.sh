set -e

tsgo --build
p_flag="--log-level silent -w" ox_flag="--fix"
[ "$1" = "--no-fix" ] && p_flag="-c" ox_flag=
if [ -f .oxlintrc.json ]; then
  prettier --cache $p_flag .
  oxlint --quiet --type-aware $ox_flag .
fi
