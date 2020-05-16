{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty
import Data.Text.Lazy (pack, unpack)

main = scotty 3000 $ do
  get "/" $ do
    justAgent <- header "User-Agent"
    let Just agent = justAgent
    text . pack $ "User-Agent: " ++ unpack agent
