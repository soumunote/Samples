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

main :: IO ()
main = do
  print $ func1 `seq` func2 `seq` func3
  print $ seq (seq func1 func2) func3
