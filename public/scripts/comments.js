'use strict';

const CommentBox = React.createClass({

    getInitialState: function() {
        return {data: []}
    },

    componentDidMount: function() {
        fetch(this.props.url).then(resp => resp.json()).then(data => this.setState({data}));
    },

    handleCommentSubmit(comment) {
        fetch(this.props.url, {
            method: "POST",
            body: new FormData(document.getElementById('commentForm')) 
        }).then(resp => resp.json()).then(data => this.setState({data}));
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>
                    I'm using React. I'm so stoked about that. Yay. No really.
                </h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        )
    }

});

const CommentList = React.createClass({
    render: function() { 

        const commentNodes = this.props.data.map(comment => 
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        );

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
});

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}

class CommentForm extends React.Component {

    constructor(){
        super();
        this.resetState();
    }

    resetState(){
        this.state = {author: '', text: ''};
    }


    handleAuthorChange(e) {
        this.setState({author: e.target.value}, () => console.log(this.state));
    }

    handleTextChange(e) {
        this.setState({text: e.target.value}, () => console.log(this.state));
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!author || !text) {
            return ;
        }
        this.props.onCommentSubmit({author, text});
        this.resetState();
    }
    
    render() {
        return (
            <form className="commentForm" id="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="author" placeholder="Your Name" value={this.state.author} onChange={this.handleAuthorChange.bind(this)} />
                <input type="text" name="text" placeholder="Say something" value={this.state.text} onChange={this.handleTextChange.bind(this)} />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
                
ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);
