{-# LANGUAGE OverloadedStrings #-}
import Web.Scotty
import Text.Blaze.Html.Renderer.Text
import qualified Web.Scotty as S
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A

main = do
  scotty 3000 $ do
    get "/" $ do
      S.html . renderHtml $ do
        H.h1 "My todo list"
