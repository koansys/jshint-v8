from array import array
import sys


char_array = array('c')
name =  sys.argv[1].split('.')[0]

char_array.fromstring("const char {}_code[] = {{".format(name))
c = 0

with open(sys.argv[1], 'rb') as fh:
    byte = fh.read(1)
    while byte:
        char_array.fromstring("{},".format(hex(ord(byte))))
        char_array.fromstring("\n" if c % 16 == 0 else '')
        c +=1
        byte = fh.read(1)
char_array.fromstring("0x00\n\n};\n")

with open("{}.h".format(name), "wb") as fh:
    fh.write(char_array.tostring())
