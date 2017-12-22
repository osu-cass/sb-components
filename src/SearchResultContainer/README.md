# Search Result Container
> Search Result Container

### Description
Allows the user to dynamically switch between an ``ItemTable`` view and ``ItemCard`` grid 

### Usage
Example props can be found in ``mocks/SearchRedultContainer/mocks.ts``
```TypeScript
// Expected props example
const props: SearchResultContainerProps = {
    onRowSelection: ( // example function signature.
        item: { itemKey: number; bankKey: number },
        reset: boolean
    ) => void;
    itemCards: [...itemCardCopy],
    item: {
        kind:"success",
        content: {...AboutItemModelResult}
    }
    defaultRenderType: SearchResultType.ItemCard // Or use SearchResultType.Table
};
```

```HTML
<!-- react render example -->
<div>
    <SearchResultContainer {...props} />
</div>
```