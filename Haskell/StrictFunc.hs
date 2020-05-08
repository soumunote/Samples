{-# OPTIONS -XBangPatterns #-}

import Debug.Trace

func :: (Num a, Show a) => a -> a
func x = (trace $ (++) "func" $ show x) x

func1 :: (Num a, Show a) => a
func1 = func 1

func2 :: (Num a, Show a) => a
func2 = func 2

func3 :: (Num a, Show a) => a
func3 = func 3

eval :: (Num a, Show a) => a -> a
eval x = trace ("eval(" ++ (show x) ++ ")") x

non :: (Num a, Show a) => a -> a -> a
non x y = y'
  where
    x' = eval x
    y' = eval y

nonBan :: (Num a, Show a) => a -> a -> a
nonBan !x !y = y'
  where
    x' = eval x
    y' = eval y

mul :: (Num a, Show a) => a -> a -> a
mul lhs rhs = 
    trace ((show $ lhs') ++ " * " ++ (show $ rhs')) (lhs' * rhs')
  where
    lhs' = eval lhs
    rhs' = eval rhs

main :: IO ()
main = do
  print "========== seq ==========\
        \seq x y は先行評価を強制する\
        \seq :: a -> b -> b\
        \x を評価した後に y を評価して y を返す"
  print $ func1 `seq` func2 `seq` func3
  print $ seq (seq func1 func2) func3
  print $ seq func1 (seq func2 func3)
  print "========== non ==========\
        \non x y はそのまま y を返す\
        \non :: (Num a, Show a) => a -> a -> a"
  print $ 1 `non` 2 `non` 3
  print $ non (non 1 2) 3
  print $ non 1 (non 2 3)
  print "========== nonBan ==========\
        \nonBan !x !y は 「x y を先行評価し」 y を返す\
        \nonBan :: (Num a, Show a) => a -> a -> a"
  print $ 1 `nonBan` 2 `nonBan` 3
  print $ nonBan (nonBan 1 2) 3
  print $ nonBan 1 (nonBan 2 3)
  print "========== mul ==========\
        \mul x y は x * y\
        \mul :: (Num a, Show a) => a -> a -> a"
  print "2 `mul` 3 `mul` 4"
  print $ 2 `mul` 3 `mul` 4
  print "mul (mul 2 3) 4"
  print $ mul (mul 2 3) 4
  print "mul 2 (mul 3 4)"
  print $ mul 2 (mul 3 4)
