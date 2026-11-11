set -e

p_flag="--write" ox_flag="--fix"
[ "$1" = "--no-fix" ] && p_flag="--check" ox_flag=
if [ -f .oxlintrc.json ]; then
  oxfmt $p_flag .
  oxlint --report-unused-disable-directives-severity error --quiet --type-aware --type-check $ox_flag .
fi
