#!/usr/bin/env bash

script_dir=$(
  cd $(dirname "$0") || exit 1
  pwd
)

source "${script_dir}"/functions.sh

work_dir=$(
  cd "${script_dir}"/.. || exit 1
  pwd
)

usage() {
  printf "Usage: %s\n \
    -c <Set the command, such as insert.> \n \
    -i <Set the file of identity.> \n \
    -s <Set the file of solutions.> \n \
    " "${base_name}"
}

run_dir=${work_dir}/run
password_file=${run_dir}/password
current_dir="$(pwd)"

# For macos`s getopt, reference: https://formulae.brew.sh/formula/gnu-getopt
while getopts ":c:s:i:" o; do
  case "${o}" in
  c)
    command=${OPTARG}
    ;;
  s)
    solution=${OPTARG}
    ;;
  i)
    identity=${OPTARG}
    ;;
  *)
    usage
    ;;
  esac
done
shift $((OPTIND - 1))

if [ -z "${identity}" ]; then
  echo "Please set the identity file=${identity}"
  exit 1
fi

identity=$(readlink -f "${identity}")

if [ ! -f "${solution}" ]; then
  echo "There is no such solution file=${solution}"
  exit 1
fi
solution=$(readlink -f "${solution}")

if [ "${command}" != "insert" ]; then
  echo "Not support command=${command}"
  exit 1
fi

cd "${run_dir}" || exit 1

# 换行区分不同的输入
read -r -s -p "Enter Password: " IDENTITY_PASSWORD
echo ""

# 将密码写入文件，macos不支持echo命令的-n选项，为了避免写入文件存在换行符，使用printf替代。
printf "%s" "${IDENTITY_PASSWORD}" >"${password_file}"

if node "${work_dir}/dist/command.js" "${command}" "${password_file}" "${solution}" "${identity}"; then
    echo "Executed successfully."
else
    echo "Executed failed!"
fi

if [ -f "${password_file}" ]; then
  rm -rf "${password_file}"
fi