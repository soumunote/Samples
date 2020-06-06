import Data.Time

helloAt :: IO String
helloAt = 
  ("Hello at " ++) <$> (show <$> (utcToZonedTime <$> getCurrentTimeZone <*> getCurrentTime))

main :: IO ()
main = do
  now <- helloAt
  putStrLn now
