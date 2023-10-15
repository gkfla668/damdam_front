type ModuleStatus = null | 'loading' | 'finish' | 'error' | 'set' | 'get' | 'add' | 'update' | 'delete'
type MoudleErrors = string | any
type MoudleMessage = null | string
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

interface Errors {
	[key: string]: string
}

interface ReduxAction {
	type: string
	data: any
}
