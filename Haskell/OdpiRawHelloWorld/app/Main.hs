{-# LANGUAGE OverloadedStrings #-}

module Main where

import Lib
import System.Environment
import Database.Dpi

conf :: OracleConfig
conf = defaultOracle 
         "admin" "kbc123" "192.168.100.233:1521/testdb"

main :: IO ()
main = do
  withContext $ \cxt ->
    withPool cxt conf return $ \pool ->
      withPoolConnection pool $ \conn ->
        withStatement conn False "SELECT SYSDATE FROM DUAL" $ \st -> do
          r <- executeStatement st ModeExecDefault
          f <- fetch st
          mapM (getQueryValue st) [1..r] >>= print
