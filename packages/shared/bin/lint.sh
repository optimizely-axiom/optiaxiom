set -e

tsgo --build
p_flag="--write" ox_flag="--fix"
[ "$1" = "--no-fix" ] && p_flag="--check" ox_flag=
if [ -f .oxlintrc.json ]; then
  oxfmt $p_flag .
  oxlint --report-unused-disable-directives-severity error --quiet --type-aware $ox_flag .
fi
