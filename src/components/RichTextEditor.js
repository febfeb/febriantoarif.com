import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { Component } from "react";

class RichTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //editorState: EditorState.createEmpty()
            editorState: this.convertValueToState(this.props.value)
        };
    }

    componentDidUpdate() {
        //console.log(this.props);
    }

    convertValueToState(value) {
        return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(value)));
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => {
                    //console.log("onEditorStateChange", editorState);
                    this.setState({ editorState });

                    if (this.props.onChangeText) {
                        this.props.onChangeText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                    }
                }}
            />
        );
    }
}
/*
const RichTextEditor = ({ value, onChangeText }) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(value)
        )
    ));

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(state) => {
                console.log("onEditorStateChange", state);
                setEditorState(state);
            }}
        />
    )
}
*/

export default RichTextEditor;