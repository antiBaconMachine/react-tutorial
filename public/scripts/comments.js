'use strict';

const CommentBox = React.createClass({

    getInitialState: function() {
        return {data: []}
    },

    componentDidMount: function() {
        fetch(this.props.url).then(resp => resp.json()).then(data => this.setState({data}));
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>
                    I'm using React. I'm so stoked about that. Yay. No really.
                </h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
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

const CommentForm = React.createClass({
    render: () => <div className="commentForm"></div>
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

const data = [
    {id: 1, author: "some dude", text: "This framework absolutely won't rot, it's the last framework we'll ever need"},
    {id: 2, author: "dogman lonelybones", text: "You shut your mouth #react4life"}
];

ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);
