const wordLength = 4

// 将两个二进制字符串相加
function addBinaryString(a, b) {
    if (a.length != wordLength) {
        throw 'a的长度应为' + wordLength
    }
    if (b.length != wordLength) {
        throw 'b的长度应为' + wordLength
    }
    let carryBit = 0 // 进位
    let c = '' //结果
    for (let i = wordLength; i--; i >= 0) {
        let aBit = a.charAt(i) - 0
        let bBit = b.charAt(i) - 0
        let cBit = (aBit + bBit + carryBit) % 2
        if (aBit + bBit + carryBit > 1) {
            carryBit = 1
        } else {
            carryBit = 0
        }
        c = cBit + c
    }
    return c
}
// 将无符号十进制数字转为二进制字符串
function transformDecimalNumberWithoutSymbolToBinaryString(decimalNumber) {
    let result = ''
    while (decimalNumber != 0) {
        let remainder = decimalNumber % 2
        result = `${remainder}${result}`
        decimalNumber = Math.floor(decimalNumber / 2)
    }
    return result.padStart(wordLength, '0')
}
// 将无符号二进制字符串转为十进制数字
function transformBinaryStringWithoutSymbolToDecimalNumber(binaryString) {
    let weight = 1
    let result = 0
    for (let i = binaryString.length - 1; i > 0; i--) {
        let binaryBit = binaryString.charAt(i) - 0
        result += binaryBit * weight
        weight *= 2
    }
    return result
}
// 将有符号十进制数字转为二进制字符串
function transformDecimalNumberWithSymbolToBinaryString(decimalNumber) {
    let symbolBit = decimalNumber > 0 ? 0 : 1
    wordLength--
    let value = transformDecimalNumberWithoutSymbolToBinaryString(Math.abs(decimalNumber))
    wordLength++
}
// 将有符号二进制字符串转为十进制数字
function transformBinaryStringWithSymbolToDecimalNumber(binaryString) {

}
for (let i = 7; i >= -8; i--) {
    let complementNumber = 0
    let complementCode = ''
    if (i < 0) {
        complementNumber = 16 + i
    } else {
        complementNumber = i
    }
    complementCode = transformDecimalNumberWithoutSymbolToBinaryString(complementNumber)
    console.log(`${String(i).padStart(2, ' ')}的补码是${complementCode}，补数是${complementNumber}`)
}

