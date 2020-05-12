{-# LANGUAGE OverloadedStrings #-}

module Main where

import Lib
import Database.Dpi
import Data.ByteString
import Data.String
import System.Environment

getConf :: IO OracleConfig
getConf = do
  username <- getEnv "ORA_USERNAME"
  passwd   <- getEnv "ORA_PASSWD"
  service  <- getEnv "ORA_SERVICE"
  return $ defaultOracle (fromString username) 
                         (fromString passwd) 
                         (fromString service)

--conf :: OracleConfig
--conf = defaultOracle "scott" "tiger" "localhost:1521/orcl"

main :: IO ()
main = do
  conf <- getConf
  withContext $ \cxt ->
    withPool cxt conf return $ \pool ->
      withPoolConnection pool $ \conn ->
        withStatement conn False "SELECT SYSDATE FROM DUAL" $ \st -> do
          r <- executeStatement st ModeExecDefault
          f <- fetch st
          mapM (getQueryValue st) [1..r] >>= print
