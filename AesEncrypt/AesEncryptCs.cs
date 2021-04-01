using System;
using System.Security.Cryptography;

class Program
{
    static void Main(string[] args)
    {
        var key = System.Text.Encoding.UTF8.GetBytes("abcdefghijklmnopqrstuvwxwzABCDEF");
        var iv = System.Text.Encoding.UTF8.GetBytes("1234567890abcdef");
        var value = System.Text.Encoding.ASCII.GetBytes("abcdefghijklmnop");
        var rijndael = new RijndaelManaged();

        rijndael.KeySize = 256;
        rijndael.Mode = CipherMode.CBC;
        rijndael.Padding = PaddingMode.None;
        rijndael.BlockSize = 128;
        rijndael.Key = key;
        rijndael.IV = iv;

        var encryptor = rijndael.CreateEncryptor();
        var decryptor = rijndael.CreateDecryptor();

        var encBytes = encryptor.TransformFinalBlock(value, 0, value.Length);

        Console.WriteLine(BitConverter.ToString(encBytes).Replace("-", ""));
        Console.ReadLine();
    }
}
