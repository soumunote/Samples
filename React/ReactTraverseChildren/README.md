自分の子要素をトラバースできるかを試した。

### 参考
https://medium.com/@svitekpavel/how-to-traverse-through-all-grand-children-in-react-2e634067f93d
https://stackoverflow.com/questions/35930825/is-it-possible-to-deep-traverse-react-children-without-rendering

2019/04/18
Childコンポーネントの type.property.関数名.apply(...) で参照できた...が
```
    React.Children.forEach(parentComponent.props.children, (child) => {
      
      if (child.props && child.props.dataField) {
        if (child.props.dataField) {
          child.type.prototype.logging.apply(child);
```
