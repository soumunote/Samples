using System;
using System.IO;

using SharpDX.XAudio2;

class SoundPlayer
{
    private XAudio2 xaDevice;
    private MasteringVoice xaMaster;

    public SoundPlayer()
    {
        xaDevice = new XAudio2();
        xaMaster = new MasteringVoice(xaDevice);
    }

    public void Play(string soundFileName)
    {
        using (var xaStream = new SharpDX.Multimedia.SoundStream(File.OpenRead(soundFileName)))
        {
            var xaSource = new SourceVoice(xaDevice, xaStream.Format);
            var xaBuffer = new AudioBuffer()
            {
                AudioBytes = (int)xaStream.Length,
                Stream = xaStream,
                LoopCount = XAudio2.NoLoopRegion,
                LoopBegin = 0,
                LoopLength = 0,
                PlayBegin = 0,
                PlayLength = 0,
                Flags = BufferFlags.EndOfStream
            };
            xaStream.Close();

            if (xaSource != null)
            {
                xaSource.SubmitSourceBuffer(xaBuffer, xaStream.DecodedPacketsInfo);
                xaSource.SetVolume(1.0f);
                xaSource.Start();
            }
        }
    }
}
