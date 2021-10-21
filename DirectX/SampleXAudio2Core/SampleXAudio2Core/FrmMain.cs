using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Windows.Forms;

public partial class FrmMain : Form
{
    public FrmMain()
    {
        InitializeComponent();
    }

    private void cmdPlay_Click(object sender, EventArgs e)
    {
        (new SoundPlayer()).Play(txtFileName.Text);
    }
}
