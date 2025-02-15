import * as React from 'react';
import { ThreeBounce } from 'better-react-spinkit';
import LoadingIndicator from '../loadingIndicator/LoadingIndicator';
import { observer } from 'mobx-react';
import { makeObservable, observable } from 'mobx';
import autobind from 'autobind-decorator';
interface FrameLoaderProps {
    url: string;
    className?: string;
    iframeId?: string;
    height?: number | string;
    width?: number | string;
}
@observer
export default class IFrameLoader extends React.Component<
    FrameLoaderProps,
    {}
> {
    public static defaultProps = {
        width: '',
    };

    @observable iframeLoaded = false;

    constructor(props: FrameLoaderProps) {
        super(props);
        makeObservable(this);
    }

    @autobind
    private onLoad() {
        this.iframeLoaded = true;
    }

    //NOTE: we need zindex to be higher than that of global loader
    render() {
        return (
            <div style={{ position: 'relative', width: this.props.width }}>
                <LoadingIndicator
                    center={true}
                    size={'big'}
                    isLoading={!this.iframeLoaded}
                />
                <iframe
                    id={this.props.iframeId || ''}
                    className={this.props.className || ''}
                    style={{
                        width: '100%',
                        position: 'relative',
                        zIndex: 100,
                        height: this.props.height,
                        border: 'none',
                    }}
                    src={this.props.url}
                    onLoad={this.onLoad}
                    allowFullScreen={true}
                ></iframe>
            </div>
        );
    }
}
