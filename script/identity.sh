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
    -c <Set the command, such as update or create.> \n \
    -o <Set the output file of identity.> \n \
    -t <Set template file for creating identity.> \n \
    " "${base_name}"
}

run_dir=${work_dir}/run
password_file=${run_dir}/password

# For macos`s getopt, reference: https://formulae.brew.sh/formula/gnu-getopt
while getopts ":c:t:o:" o; do
  case "${o}" in
  c)
    command=${OPTARG}
    ;;
  t)
    template=${OPTARG}
    ;;
  o)
    output=${OPTARG}
    ;;
  *)
    usage
    ;;
  esac
done
shift $((OPTIND - 1))

if [ -z "${output}" ]; then
  echo "Please set the output identity file=${output}"
  exit 1
fi

output_name=$(basename "$output")
output_dir=$(dirname "$output")
mkdir -p "${output_dir}"

if [ ! -f "${template}" ]; then
  echo "There is no such template file=${template}"
  exit 1
fi

template=$(readlink -f "${template}")
echo "Identity template=${template}"

if [ "${command}" != "create" ] && [ "${command}" != "update" ]; then
  echo "Not support command=${command}"
  exit 1
fi

output=$(readlink -f "${output_dir}")/${output_name}
echo "Identity filepath=${output}"

cd "${run_dir}" || exit 1

# 换行区分不同的输入
read -r -s -p "Enter Password: " IDENTITY_PASSWORD
echo ""

if [ "${command}" == "create" ]; then
  read -r -s -p "Confirm Password: " IDENTITY_CONFIRM_PASSWORD
  if [ "${IDENTITY_PASSWORD}" != "${IDENTITY_CONFIRM_PASSWORD}" ]; then
    echo "The two passwords entered do not match."
    exit 1
  fi
  echo ""
fi

# 将密码写入文件，macos不支持echo命令的-n选项，为了避免写入文件存在换行符，使用printf替代。
printf "%s" "${IDENTITY_PASSWORD}" >"${password_file}"

npm install
npm run build
if node "${work_dir}/dist/command.js" "${command}" "${password_file}" "${template}" "${output}"; then
    echo "Executed successfully."
else
    echo "Executed failed!"
fi

if [ -f "${password_file}" ]; then
  rm -rf "${password_file}"
fi
