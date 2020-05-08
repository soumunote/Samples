{-
  正格関数の確認
  以下の関数を使用
    seq
    trace
-}

import Debug.Trace

func :: (Num a, Show a) => a -> a
func x = (trace $ (++) "func" $ show x) x

func1 :: (Num a, Show a) => a
func1 = func 1

func2 :: (Num a, Show a) => a
func2 = func 2

func3 :: (Num a, Show a) => a
func3 = func 3

non :: a -> b -> b
non _ y = y

eval :: (Num a, Show a) => a -> a
eval x = trace ("eval(" ++ (show x) ++ ")") x

mul :: (Num a, Show a) => a -> a -> a
mul lhs rhs = 
    trace ((show $ lhs') ++ " * " ++ (show $ rhs')) (lhs' * rhs')
  where
    lhs' = eval lhs
    rhs' = eval rhs

main :: IO ()
main = do
  print "-- seq --"
  print $ func1 `seq` func2 `seq` func3
  print $ seq (seq func1 func2) func3
  print $ seq func1 (seq func2 func3)
  print "-- non --"
  print $ func1 `non` func2 `non` func3
  print $ non (non func1 func2) func3
  print $ non func1 (non func2 func3)
  print "-- mul --"
  print "2 `mul` 3 `mul` 4"
  print $ 2 `mul` 3 `mul` 4
  print "mul (mul 2 3) 4"
  print $ mul (mul 2 3) 4
  print "mul 2 (mul 3 4)"
  print $ mul 2 (mul 3 4)
