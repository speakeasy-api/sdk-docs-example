import {LanguageOperation, DocsSection} from "../../components/languageOperation";
import GoOverview from "../../content/go/sdks/identity/overview.mdx"
import GoParameters from "../../content/go/sdks/identity/parameters.mdx"
import GoResponse from "../../content/go/sdks/identity/response.mdx"
import GoUsage from "../../content/go/sdks/identity/usage.mdx"
import TsOverview from "../../content/typescript/sdks/identity/overview.mdx"
import TsParameters from "../../content/typescript/sdks/identity/parameters.mdx"
import TsResponse from "../../content/typescript/sdks/identity/response.mdx"
import TsUsage from "../../content/typescript/sdks/identity/usage.mdx"

export const IdentitySection = () => {
    const go = <LanguageOperation overview={<GoOverview/>} parameters={<GoParameters/>} response={<GoResponse/>}
                                  usage={<GoUsage/>}/>
    const typescript = <LanguageOperation overview={<TsOverview/>} parameters={<TsParameters/>} response={<TsResponse/>}
                                          usage={<TsUsage/>}/>

    return <DocsSection route={"identity"} languageToContent={{go, typescript}}/>
}
