{-# LANGUAGE TemplateHaskell #-}

import Data.Time

helloAt :: IO String
helloAt = 
  show <$> utcToZonedTime <$> getCurrentTimeZone <*> getCurrentTime
  --pure show <$> utcToZonedTime <$> getCurrentTimeZone <*> getCurrentTime

main :: IO ()
main = do
  now <- helloAt
  putStrLn now

{-
f1 :: Show a => TimeZone -> a -> String
f1 = pure show <$> utcToZonedTime 

f2 :: Show a => IO (a -> String)
f2 = f1 <$> getCurrentTimeZone 

f3 :: IO String
f3 = f2 <*> getCurrentTime

add2 :: (Show a, Num a) => a -> String
add2 = show <$> (+2)
-}