Get-ChildItem



# try {
#     $file = '.\node_modules\@elrondnetwork\erdjs\out\dapp\extensionProvider.js'


#     $find = 'SystemConstants.SYSTEM_ABI_PATH = path_1.default.join(__dirname, "../../../abi");'
#     $replace = 'SystemConstants.SYSTEM_ABI_PATH = path_1.default.join(".", "../../../abi");'

# (Get-Content $file).replace($find, $replace) | Set-Content $file
# }
# catch {
#     "An err occured 1"
# }

# try {
#     $file = 'node_modules\@elrondnetwork\erdjs\out\dapp\extensionProvider.js'
#     $find = 'SystemConstants.SYSTEM_ABI_PATH = path_1.default.join(__dirname, "../../../abi");'
#     $replace = 'SystemConstants.SYSTEM_ABI_PATH = path_1.default.join(".", "../../../abi");'
    
#     (Get-Content $file).replace($find, $replace) | Set-Content $file
# }
# catch {
#     "An error occurred.2"
# }