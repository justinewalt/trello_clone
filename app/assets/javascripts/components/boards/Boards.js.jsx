class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.state = { boards: this.props.boards };
		this.addBoard = this.addBoard.bind(this);
		this.deleteBoard = this.deleteBoard.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
	}

	updateBoard(id, board) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'PUT',
			data: { board: {...board}},
			dataType: 'JSON'
		}).success( board => {
			let boards = this.state.boards;
			let editBoard = boards.find( b => b.id === board.id )
			editBoard.name = board.name;
			editBoard.description = board.description;
			this.setState({ boards: boards });
		}).error( error => {
			alert('error');
		});
	}

	deleteBoard(id) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'DELETE'
		}).success( board => {
			let boards = this.state.boards;
			let index = boards.findIndex( b => b.id === board.id );
			boards.splice(index, 1);
			this.setState({ boards: boards })
		}).error ( error => {
			console.log(error);
		})
	}

	addBoard(board) {
		this.setState({boards: [board, ...this.state.boards ]});
	}

	render() {
		let boards = this.state.boards.map( board => {
			return(
				<Board 
					key={`board-${board.id}`} 
					{...board} 
					delete={this.deleteBoard}
					updateBoard={this.updateBoard}
				/>
			);
		});
		return(
			<div className='row'>
				<NewBoard addBoard={this.addBoard} />
				<h2 className='center'>Boards</h2>
				{boards}
			</div>
		);
	}
}