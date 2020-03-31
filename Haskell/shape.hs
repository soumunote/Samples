-------------------------------------------------------------------------------
--
-- 型シノニムにより座標を定義する
--
type Coord = (Double, Double)

x :: Coord -> Double
x coord = fst coord
y :: Coord -> Double
y coord = snd coord

-- データコンストラクタで定義しても良いが (,) タプルは Show, Read, Eq, Ord
-- を実装しているので、 deriving, instance を利用できない type で十分
-- data Coord = Coord Double Double deriving(Eq)


-------------------------------------------------------------------------------
--
-- 型シノニムにより座標を定義する
--
data Shape = Triangle Coord Coord Coord
           | Rectangle Coord Coord Coord Coord
           | Circle Coord Double
