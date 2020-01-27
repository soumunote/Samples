using System;
using Windows.Foundation;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

namespace UWPTutorialsInMSDN
{
    class BoxPanel : Panel
    {
        int maxrc, rowcount, colcount;
        double cellwidht, cellheight, maxcellheight, aspectratio;

        protected override Size MeasureOverride(Size availableSize)
        {
            maxrc = (int)Math.Ceiling(Math.Sqrt(Children.Count));
            aspectratio = availableSize.Width / availableSize.Height;

            if (aspectratio < 1)
            {
                rowcount = maxrc;
                colcount = (maxrc > 2 && Children.Count < maxrc * (maxrc - 1)) ? maxrc - 1 : maxrc;
            }
            else
            {
                rowcount = (maxrc > 2 && Children.Count < maxrc * (maxrc - 1)) ? maxrc - 1 : maxrc;
                colcount = maxrc;
            }

            cellwidht = (int)Math.Floor(availableSize.Width / colcount);
            cellheight = Double.IsInfinity(availableSize.Height) ? Double.PositiveInfinity : availableSize.Height / rowcount;

            foreach (UIElement child in Children)
            {
                child.Measure(new Size(cellwidht, cellheight));
                maxcellheight = (child.DesiredSize.Height > maxcellheight) ? child.DesiredSize.Height : maxcellheight;
            }

            return LimitUnboundedSize(availableSize);
        }

        Size LimitUnboundedSize(Size input)
        {
            if (Double.IsInfinity(input.Height))
            {
                input.Height = maxcellheight * colcount;
                cellheight = maxcellheight;
            }
            return input;
        }

        protected override Size ArrangeOverride(Size finalSize)
        {
            int count = 1;
            double x, y;

            foreach (UIElement child in Children)
            {
                x = (count - 1) % colcount * cellwidht;
                y = ((int)(count - 1) / colcount) * cellheight;
                Point anchorPoint = new Point(x, y);
                child.Arrange(new Rect(anchorPoint, child.DesiredSize));
                count++;
            }

            return finalSize;
        }

        public static readonly DependencyProperty UseOppositeRCRatioProperty =
            DependencyProperty.Register("UseOppositeRCRatio", typeof(bool), typeof(BoxPanel), null);

        public bool UseSquareCells
        {
            get => (bool)GetValue(UseOppositeRCRatioProperty);
            set => SetValue(UseOppositeRCRatioProperty, value);
        }
    }
}
