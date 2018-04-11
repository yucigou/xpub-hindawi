(Note: this repo is forked, for the purpose of study only, from https://gitlab.coko.foundation/xpub/xpub-faraday)

Note: xpub is still _very_ new. This repository contains an initial set of components but is not yet ready for use.

## xPub-faraday  

An MVP implementation of the first design sessions which allows a user to go through the process of creating a submission, assigning editors and reviewers, submitting reviews and submitting a decision.  

## Roadmap

The major tasks we're planning to work on are the following: 
* Implement a future-proof theming setup. (#88)
* Let users go through multiple rounds of review. (#50)
* Implement roles and permissions. (#58)
* Change the data model to account for the changes that have occured in `pubsweet-server`, as well as to make it easily portable to Postgres in the future. (#67)
* Merge xpub's authentication, routing and navigation with pubsweet's. (#55 #89 #57)

![Project roadmap](https://gitlab.coko.foundation/xpub/xpub-faraday/raw/master/packages/xpub-faraday/static/faraday-roadmap.png "Faraday Project Roadmap")

You can follow more fine-grained lists of things that we're working on  
* [Faraday](https://gitlab.coko.foundation/xpub/xpub-faraday/boards) for tasks related to `xpub-faraday` and  
* [Xpub](https://gitlab.coko.foundation/xpub/xpub/boards?scope=all&utf8=%E2%9C%93&state=opened&milestone_title=Xpub) for more general xpub concerns

## Installing

In the root directory, run `yarn` to install all the dependencies.

## Configuration
Add the following values to `packages/xpub-collabra/config/local-development.json`

```json
{
  "pubsweet-server": {
    "secret": "__EDIT_THIS__"
  }
}
```

## Running the app

1. `cd packages/xpub-faraday`
2. The first time you run the app, initialize the database with `yarn run setupdb` (press Enter when asked for a collection title, to skip that step).
3. `yarn start`


## Community

Join [the Mattermost channel](https://mattermost.coko.foundation/coko/channels/xpub) for discussion of xpub.
