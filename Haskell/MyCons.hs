data MyList a = 
    Empty 
  | Cons { 
      car :: a,
      cdr :: (MyList a) 
    } 
  deriving (Show, Read, Eq, Ord)

toList :: MyList a -> [a]
toList Empty = []
toList (Cons car cdr) = car : toList cdr
