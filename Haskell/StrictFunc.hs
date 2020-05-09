{-# OPTIONS -XBangPatterns #-}

import Debug.Trace
import Text.Show.Unicode

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
  putStrLn "========== seq ==========\n\
           \seq x y は先行評価を強制する\n\
           \seq :: a -> b -> b\n\
           \x を評価した後に y を評価して y を返す\n\
           \●先行評価した場合、どの書き方でも左側から順次評価\n\
           \-------------------------"
  putStrLn . show $ func1 `seq` func2 `seq` func3
  putStrLn . show $ seq (seq func1 func2) func3
  putStrLn . show $ seq func1 (seq func2 func3)
  
  putStrLn "========== non ==========\n\
           \non x y はそのまま y を返す\n\
           \non :: (Num a, Show a) => a -> a -> a\n\
           \●自作nonの場合、本当に必要だった引数"3"しか評価されない\n\
           \-------------------------"
  putStrLn . show $ 1 `non` 2 `non` 3
  putStrLn . show $ non (non 1 2) 3
  putStrLn . show $ non 1 (non 2 3)

  putStrLn "========== nonBan ==========\n\
           \nonBan !x !y は 「x y を先行評価し」 y を返す\n\
           \nonBan :: (Num a, Show a) => a -> a -> a\n\
           \●自作banの BangPattern拡張バージョンは、先行評価するが、seqほど全評価するわけでは無い\n\
           \----------------------------"
  putStrLn . show $ 1 `nonBan` 2 `nonBan` 3
  putStrLn . show $ nonBan (nonBan 1 2) 3
  putStrLn . show $ nonBan 1 (nonBan 2 3)
  
  putStrLn "========== mul ==========\n\
           \mul x y は x * y\n\
           \mul :: (Num a, Show a) => a -> a -> a\n\
           \●まぁ、見ての通り\n\
           \-------------------------"
  putStrLn .show $ 2 `mul` 3 `mul` 4
  putStrLn .show $ mul (mul 2 3) 4
  putStrLn .show $ mul 2 (mul 3 4)
