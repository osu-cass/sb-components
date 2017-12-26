# Search Result Container
> Search Result Container

### Description
Allows the user to dynamically switch between an ``ItemTable`` view and ``ItemCard`` grid via button click. The ``ItemTable`` and ``ItemCard`` simply display search results of test items from www.SmarterBalanced.org

- **onRowSelection:** onRowSelection is a callback to the parent container used to alter the selected ``item`` of the ``SearchResultContainer``.
- **itemCards:** itemCards is used by both render types and acts as a source for avaliable test items.
- **item:** Item is used by ``ItemTable`` to display the choosen previewed test item.
- **defaultRenderType:** This option chooses the inital render of the component.


### Usage
More example props can be found in ``mocks/SearchRedultContainer/mocks.ts``.

```TypeScript
// Expected props example
const props: SearchResultContainerProps = {

    onRowSelection: ( // function signature.
        item: { itemKey: number; bankKey: number },
        reset: boolean
    ) => void,

    itemCards: [...itemCardCopy],

    item: {
        kind:"success",
        content: {...AboutItemModelResult}
    },

    defaultRenderType: SearchResultType.ItemCard // Or use SearchResultType.Table
};
```

```HTML
<!-- react render example -->
<div>
    <SearchResultContainer {...props} />
</div>
```