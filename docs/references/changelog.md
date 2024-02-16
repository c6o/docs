---
sidebar_position: 2
---

# Release Notes

## 2.0.0

No new changes since 2.0.0-rc.19.

## [2.0.0-rc.19](https://github.com/c6o/codezero/compare/2.0.0-rc.18...2.0.0-rc.19) (2024-02-08)


### Bug Fixes

* Fix minor bug in Teamspace selector ([3a86e63](https://github.com/c6o/codezero/commit/3a86e63fc6762cb8a7f05a0a77d98a296162d642))


## [2.0.0-rc.18](https://github.com/c6o/codezero/compare/2.0.0-rc.17...2.0.0-rc.18) (2024-02-07)


### Bug Fixes

* fixes errors regarding closed connections ([#853](https://github.com/c6o/codezero/issues/853)) ([4e28db6](https://github.com/c6o/codezero/commit/4e28db6e9cd8c40775131f28b1b64e8087cc8c07))


### Features

* new app layout ([#892](https://github.com/c6o/codezero/issues/892)) ([c5df251](https://github.com/c6o/codezero/commit/c5df251965bf5d96e8be148935935e31dd0dcca4))


## [2.0.0-rc.17](https://github.com/c6o/codezero/compare/2.0.0-rc.16...2.0.0-rc.17) (2024-01-30)


### Bug Fixes

* clear localStorage on logout ([#825](https://github.com/c6o/codezero/issues/825)) ([3e21051](https://github.com/c6o/codezero/commit/3e21051d4445687ee31764f5416bfad255a7b61b))
* fixed error when `czctl status` is executed and user is not logged in ([#852](https://github.com/c6o/codezero/issues/852)) ([f9b372f](https://github.com/c6o/codezero/commit/f9b372f2d9fc91871ee29c8c4643e150ab85a9ed)), closes [#866](https://github.com/c6o/codezero/issues/866) [#861](https://github.com/c6o/codezero/issues/861) [#865](https://github.com/c6o/codezero/issues/865) [#864](https://github.com/c6o/codezero/issues/864) [#863](https://github.com/c6o/codezero/issues/863) [#794](https://github.com/c6o/codezero/issues/794)
* handle tcp consume and unify externalname service behavior ([#910](https://github.com/c6o/codezero/issues/910)) ([f6f28af](https://github.com/c6o/codezero/commit/f6f28af75880af102743561bbec5e65e3c35cc12))
* incorrect frontend version vs api version reporting ([3c422ca](https://github.com/c6o/codezero/commit/3c422ca919d65fb6ff43b1771a7cbc8cf9e3cfc9))
* update fallback DNS resolvers if current ones fail ([#790](https://github.com/c6o/codezero/issues/790)) ([7db20c9](https://github.com/c6o/codezero/commit/7db20c9140c6320fa96e360d1d8fba4ac4b21694))


### Features

* ability to consume headless and external services ([#890](https://github.com/c6o/codezero/issues/890)) ([99b3c25](https://github.com/c6o/codezero/commit/99b3c256334ef17b7aa0cb9f0b2f16a8d511e256))
* add selected org and primary namespace to czctl status output ([#902](https://github.com/c6o/codezero/issues/902)) ([8560680](https://github.com/c6o/codezero/commit/85606808fbf700a926b754899faee8bd5dd1ccb7))
* **czctl:** add primary namespace check and selection ([#811](https://github.com/c6o/codezero/issues/811)) ([22e336e](https://github.com/c6o/codezero/commit/22e336e64bf64339e4479287d752db6c5d96cc28))
* improved onboarding flow ([#903](https://github.com/c6o/codezero/issues/903)) ([e4723e9](https://github.com/c6o/codezero/commit/e4723e942a98fb30a572118da37cb9b5f4fee344))
* make hosts resolver the default in czdaemon ([#868](https://github.com/c6o/codezero/issues/868)) ([8690c83](https://github.com/c6o/codezero/commit/8690c83119c27ff84712d76baeb88d5f2ac420d0))


## [2.0.0-rc.16](https://github.com/c6o/codezero/compare/2.0.0-rc.15...2.0.0-rc.16) (2023-12-19)


### Bug Fixes

* cannot create ip alias, exit status 2 ([#773](https://github.com/c6o/codezero/issues/773)) ([725dff9](https://github.com/c6o/codezero/commit/725dff95472d8791fd58533895a93be1d990f718))


### Features

* ability to publish a service that does not exist in cluster ([#751](https://github.com/c6o/codezero/issues/751)) ([453e030](https://github.com/c6o/codezero/commit/453e0305aaeef46d7c576e69dd0741d6471c7481))
* implement alternative host resolver handling using hosts file ([#782](https://github.com/c6o/codezero/issues/782)) ([3db4f1d](https://github.com/c6o/codezero/commit/3db4f1d3c5a7c9d9a26b0fd27a126b5692e2f41c))
* refactor DNS manager, backup and OS interface ([#736](https://github.com/c6o/codezero/issues/736)) ([3a55b2e](https://github.com/c6o/codezero/commit/3a55b2e782c501811aaeccff0cc5bbeb05537bce))
* support reading ruleset from stdin on czctl apply ([#607](https://github.com/c6o/codezero/issues/607)) ([4a98765](https://github.com/c6o/codezero/commit/4a987651108f20f556cb2183668b76a85f506f74))


## [2.0.0-rc.15](https://github.com/c6o/codezero/compare/2.0.0-rc.14...2.0.0-rc.15) (2023-11-21)

### Bug Fixes

* failure to restore intercept if copy service has annotations added ([#706](https://github.com/c6o/codezero/issues/706)) ([4732b7c](https://github.com/c6o/codezero/commit/4732b7c1cea394bb20299057b8af1a39acb1adee)), closes [#705](https://github.com/c6o/codezero/issues/705)
* invite token processed multiple times ([#725](https://github.com/c6o/codezero/issues/725)) ([d1410ae](https://github.com/c6o/codezero/commit/d1410aeba365fb29b4d3124758e0232bd94f51ab))
* spaces do not load for new organizations ([#726](https://github.com/c6o/codezero/issues/726)) ([a6b1245](https://github.com/c6o/codezero/commit/a6b1245acfb250e469c34c527bb3868655adcb85))
* unset space from contexts after removal ([#701](https://github.com/c6o/codezero/issues/701)) ([544f7fe](https://github.com/c6o/codezero/commit/544f7fe13fc1329d0bdd809c95eeda7154390fd3))
* update paging to 100 ([e28cc94](https://github.com/c6o/codezero/commit/e28cc942da96eafd43a2b119c4f5062b897e012b))


### Features

* added ability to upgrade teamspace from hub ([#710](https://github.com/c6o/codezero/issues/710)) ([9c7eb8f](https://github.com/c6o/codezero/commit/9c7eb8f957915fe4ad1013c2ee2ba87508463a0e))


## [2.0.0-rc.14](https://github.com/c6o/codezero/compare/2.0.0-rc.13...2.0.0-rc.14) (2023-11-15)

### Bug Fixes

* paging issues for consume and catalog ([#682](https://github.com/c6o/codezero/issues/682)) ([aca2aec](https://github.com/c6o/codezero/commit/aca2aecd815cda34cac3cd91246e53654bf8846b))


### Features

* add default, user and header conditions to `czctl serve` ([#677](https://github.com/c6o/codezero/issues/677)) ([ca8b364](https://github.com/c6o/codezero/commit/ca8b3642ce69549a49fc3147fa6d8800f171a5df))


## [2.0.0-rc.13](https://github.com/c6o/codezero/compare/2.0.0-rc.12...2.0.0-rc.13) (2023-11-07)

### Bug Fixes

* moved local service addresses to local.t8s.io instead of .local so we don't conflict with mDNS (Bonjour etc.)
* added better cors handling to orchestrator proxy ([#668](https://github.com/c6o/codezero/issues/668)) ([eedb7c3](https://github.com/c6o/codezero/commit/eedb7c33f5e1383fc230b2d14e006a9d59e85d82))
* errors when attempting to service list catalog with other users ([7bcfb0a](https://github.com/c6o/codezero/commit/7bcfb0a1075aae2d3445a723c917e24812efdfe9))
* long loading in czapp after czctl stop ([#616](https://github.com/c6o/codezero/issues/616)) ([485254f](https://github.com/c6o/codezero/commit/485254fbf53db149e8d2eb418857bd2ff8d9bf96))
* multiple users cannot serve the same resource ([#654](https://github.com/c6o/codezero/issues/654)) ([f018c6e](https://github.com/c6o/codezero/commit/f018c6e8ebb798213ba181bb2d6f00c322ee667f))
* paging issues that broke serve ([ad4acef](https://github.com/c6o/codezero/commit/ad4acefe97b09f704502e1e523537c1c39879b5c))
* save dialogs reverts before saving ([#653](https://github.com/c6o/codezero/issues/653)) ([7ed077f](https://github.com/c6o/codezero/commit/7ed077f4a178f881f4fb5724a21ec340499e7ca0))
* unable to consume because of variant iteration error ([726cb67](https://github.com/c6o/codezero/commit/726cb679c688791dc0d76a229029cbd530d6d6ac))

## [2.0.0-rc.12](https://github.com/c6o/codezero/compare/2.0.0-rc.11...2.0.0-rc.12) (2023-11-03)

### Bug Fixes

* change daemon listening address to .local (yeah this was a bad idea! - see RC13)  ([#639](https://github.com/c6o/codezero/issues/639)) ([5f99f4c](https://github.com/c6o/codezero/commit/5f99f4c054e47394cb92b599badc0065c1a09845))


### Features

* added support to bypass ISP for space ingress DNS ([#643](https://github.com/c6o/codezero/issues/643)) ([7026e5d](https://github.com/c6o/codezero/commit/7026e5d321c4b64b3068feafb99294d56c18b808))
* added version check to czctl ([deba699](https://github.com/c6o/codezero/commit/deba6994c674280f98519775c875d5beac2813a8))
* added version display and added copyable install instructions to getting started ([#644](https://github.com/c6o/codezero/issues/644)) ([b905186](https://github.com/c6o/codezero/commit/b9051863cfef871f271540ecf4894c2d503865ab))


## [2.0.0-rc.11](https://github.com/c6o/codezero/compare/2.0.0-rc.10...2.0.0-rc.11) (2023-10-31)


### Features

* add --reinstall-certs flag to czctl start and add czctl opts certs ([#590](https://github.com/c6o/codezero/issues/590)) ([370b38f](https://github.com/c6o/codezero/commit/370b38fd197fc28f4734d8206450b4f5bf610282))
* added support for default and header based conditions when serving variants ([#617](https://github.com/c6o/codezero/issues/617)) ([5564ceb](https://github.com/c6o/codezero/commit/5564ceb0c2a1c8626c3d18b1f2db82368256ad96))
* show version number of space agent in czapp teamspaces list ([#542](https://github.com/c6o/codezero/issues/542)) ([547b8ee](https://github.com/c6o/codezero/commit/547b8eed6690588b814a23e3d4d5935cf2c1d06f))

## [2.0.0-rc.10](https://github.com/c6o/codezero/compare/2.0.0-rc.9...2.0.0-rc.10) (2023-10-16)

### Bug Fixes

* count only active teleports in command limit enforcer ([#543](https://github.com/c6o/codezero/issues/543)) ([f6ae569](https://github.com/c6o/codezero/commit/f6ae569c24f7c1bb4e02086c9a082c07ea4e350b))
* **czapp:** clear timed display timer when space was removed ([#519](https://github.com/c6o/codezero/issues/519)) ([ad2ca56](https://github.com/c6o/codezero/commit/ad2ca56e4ac366269a54cf7315fe5912894370a2)), closes [#391](https://github.com/c6o/codezero/issues/391)
* fix czctl serve update ([#551](https://github.com/c6o/codezero/issues/551)) ([7a6ae5c](https://github.com/c6o/codezero/commit/7a6ae5c099e9ba6a61570aa35c3a4ba8ab6f31d3))
* fixes crash when restoring DNS on an unavailable network service ([#511](https://github.com/c6o/codezero/issues/511)) ([f1ff93e](https://github.com/c6o/codezero/commit/f1ff93ed604d6d2efda04dc078be04dac3e7276d))
* fixes invite user allows user to invite the same email multiple times while pending ([#465](https://github.com/c6o/codezero/issues/465)) ([c9442ab](https://github.com/c6o/codezero/commit/c9442abeb15271be110bf1a38cfadf574f369ff0))
* ignore handled feathers services errors ([#532](https://github.com/c6o/codezero/issues/532)) ([1a66f74](https://github.com/c6o/codezero/commit/1a66f7490c6f4e4eadb118ffa7e0ed58d2fe8de5))
* **linux** builds were for darwin ([7657157](https://github.com/c6o/codezero/commit/765715784585a7e58cc84b2a611c28827e32bc68))


### Features

* front-side hub schema validators ([#419](https://github.com/c6o/codezero/issues/419)) ([77c2236](https://github.com/c6o/codezero/commit/77c2236d5fa6c043bba704623325b1d00a1b21e5))
* **linux:** fix DNS creation when backup file already exists ([#566](https://github.com/c6o/codezero/issues/566)) ([dcc1c48](https://github.com/c6o/codezero/commit/dcc1c489fc37c736474a5b8d323ac12732cdc2a3))

## [2.0.0-rc.9](https://github.com/c6o/codezero/compare/2.0.0-rc.8...2.0.0-rc.9) (2023-09-22)

### Bug Fixes

* incorrect bin file paths ([#510](https://github.com/c6o/codezero/issues/510)) ([de61482d](https://github.com/c6o/codezero/commit/de61482d))


## [2.0.0-rc.8](https://github.com/c6o/codezero/compare/2.0.0-rc.7...2.0.0-rc.8) (2023-09-22)


### Features

* add feature flags ([#500](https://github.com/c6o/codezero/issues/500)) ([90b698c](https://github.com/c6o/codezero/commit/90b698c3bf7b533c263f942591ad68a91e7fb8eb))
* improved onboarding experience ([#512](https://github.com/c6o/codezero/issues/512)) ([3dbb67b](https://github.com/c6o/codezero/commit/3dbb67b0614f4a9d9bdc77c7e6f0673710f0f297))

## [2.0.0-rc.7](https://github.com/c6o/codezero/compare/2.0.0-rc.6...2.0.0-rc.7) (2023-09-21)


### Bug Fixes

* broken intercept with different port/targetPort ([#510](https://github.com/c6o/codezero/issues/510)) ([70ee1eb](https://github.com/c6o/codezero/commit/70ee1ebb94ad0d5f77a8132488ffe8b9c6a2c8ec))
* description of primary-namespace clear ([#480](https://github.com/c6o/codezero/issues/480)) ([295986b](https://github.com/c6o/codezero/commit/295986baeac301f4368a7aee358b9c402ca70e9a))
* get space token corrupts space list ([523c33a](https://github.com/c6o/codezero/commit/523c33aabdc4ebf9005b276bb79a0e5fbffbf23e))
* remove hub authentication.create call on each czctl cmd ([#497](https://github.com/c6o/codezero/issues/497)) ([685be8e](https://github.com/c6o/codezero/commit/685be8eb511453c42cb471502bff903e4e1dfaa7))


### Features

* ensure that czdaemon does not restart when changing spaces ([#473](https://github.com/c6o/codezero/issues/473)) ([b048ff2](https://github.com/c6o/codezero/commit/b048ff285bc5ce63833c10810499a4c4f48aec2d))
* make go logs consistent ([#499](https://github.com/c6o/codezero/issues/499)) ([9558054](https://github.com/c6o/codezero/commit/9558054f586d514bfcf95509637bab39e2583c4e))

## [2.0.0-rc.6](https://github.com/c6o/codezero/compare/2.0.0-rc.5...2.0.0-rc.6) (2023-09-04)

## [2.0.0-rc.5](https://github.com/c6o/codezero/compare/2.0.0-rc.4...2.0.0-rc.5) (2023-08-31)


### Bug Fixes

* cache space context and token ([#442](https://github.com/c6o/codezero/issues/442)) ([5ee6f30](https://github.com/c6o/codezero/commit/5ee6f305288f5ae1b16440b09b83827353b45ae1))
* network services parsing ([9055618](https://github.com/c6o/codezero/commit/9055618d184b8bb5f178d15071519fe06b48acca))
* prevent invitation token leak ([#464](https://github.com/c6o/codezero/issues/464)) ([38b2c3f](https://github.com/c6o/codezero/commit/38b2c3f251c612654b3416d4e29e0b421961d99a))


### Features

* add orchestrator status to czctl status ([#386](https://github.com/c6o/codezero/issues/386)) ([1c00258](https://github.com/c6o/codezero/commit/1c002585b7c6f02e7c2c9206dd6e6f3f6f5bc3eb))
* add schema validation in hub ([#420](https://github.com/c6o/codezero/issues/420)) ([59ad978](https://github.com/c6o/codezero/commit/59ad97895955871f8f32625560b95b433d1c4f50))
* get context instead of find on go hubclient ([#427](https://github.com/c6o/codezero/issues/427)) ([6331285](https://github.com/c6o/codezero/commit/633128593b3c30cae9bcd0a8696dbff8ca6cbb26))
* show header details in service catalog ([#456](https://github.com/c6o/codezero/issues/456)) ([6bcd1ad](https://github.com/c6o/codezero/commit/6bcd1ad0248b7c095dbc0b4e012d328dd7d92333))
* use validators on create/patch api/spaces ([#409](https://github.com/c6o/codezero/issues/409)) ([a4bde67](https://github.com/c6o/codezero/commit/a4bde67704321dbc05096a025c1c6ea01d44a98d))
* user profile and unique name ([#454](https://github.com/c6o/codezero/issues/454)) ([ce657bf](https://github.com/c6o/codezero/commit/ce657bfee418004b64ffdc5ede10b9719c9e79c5))

## [2.0.0-rc.4](https://github.com/c6o/codezero/compare/2.0.0-rc.3...2.0.0-rc.4) (2023-08-24)


### Bug Fixes

* remove space name from certificates ([#407](https://github.com/c6o/codezero/issues/407)) ([1bb2e60](https://github.com/c6o/codezero/commit/1bb2e604ebc7e58b3128806c6a285e79803b29ae))


### Features

* **containerize:** Add containerize workflow ([#393](https://github.com/c6o/codezero/issues/393)) ([51bcb49](https://github.com/c6o/codezero/commit/51bcb49c0e6033e74ecb658647a32bdff4bec788))
* improved typesafety of hub and core clients ([#378](https://github.com/c6o/codezero/issues/378)) ([6be233d](https://github.com/c6o/codezero/commit/6be233d28c376fdd420533fb6f3b8f74ab02896b))
* Stripe checkout & billing portal ([#383](https://github.com/c6o/codezero/issues/383)) ([6686d7f](https://github.com/c6o/codezero/commit/6686d7fc8c18fd4d622e941f702398cfc2d351f0))

## [2.0.0-rc.3](https://github.com/c6o/codezero/compare/2.0.0-rc.2...2.0.0-rc.3) (2023-08-15)


### Bug Fixes

* add Terraform variable for Stripe secret key ([#384](https://github.com/c6o/codezero/issues/384)) ([a0a2cc9](https://github.com/c6o/codezero/commit/a0a2cc91b93f719580acb112de2f65fdf2b73981))
* connection is unstable requests take too long to be verified ([#321](https://github.com/c6o/codezero/issues/321)) ([5694e76](https://github.com/c6o/codezero/commit/5694e769febdb28f735025d74060addbe9c3761a))
* enable WebSocket proxy for '/api' endpoint ([#381](https://github.com/c6o/codezero/issues/381)) [skip ci] ([17616b9](https://github.com/c6o/codezero/commit/17616b91783def68dc819c1f24e455906caf4c44))
* fixes selecting no organisation ([#385](https://github.com/c6o/codezero/issues/385)) ([c2a0ac8](https://github.com/c6o/codezero/commit/c2a0ac8bbd892c2d4f8cd75ebb6cff6b81709585))
* ignore tainted resources when observing kubernetes resources ([#377](https://github.com/c6o/codezero/issues/377)) ([cdf9f79](https://github.com/c6o/codezero/commit/cdf9f790c453997b03e0191443a53fe5631a317a))
* navigation highlighting when in service catalog ([b73b30c](https://github.com/c6o/codezero/commit/b73b30c9e9c85e981f2ce6d784aa54821736ef2d))
* open login page instead of GitHub oauth page for auth login ([#337](https://github.com/c6o/codezero/issues/337)) ([782b34c](https://github.com/c6o/codezero/commit/782b34c90c3d02ba7d5b9ae082112653a755c0e3)), closes [#335](https://github.com/c6o/codezero/issues/335)
* remove dargo imports ([#366](https://github.com/c6o/codezero/issues/366)) ([95a3677](https://github.com/c6o/codezero/commit/95a3677a854f126b4cdf7f988359106dbcc0c511))
* rollout restart codezero after registration ([#380](https://github.com/c6o/codezero/issues/380))  [skip ci] ([a8605a7](https://github.com/c6o/codezero/commit/a8605a70a988c9de0405bcd8b259e0e8077de44e))
* spaces not refreshing properly ([f806e33](https://github.com/c6o/codezero/commit/f806e3362fe4ef302c187b63c55a1d3579787d89))
* use separate /auth/cli login path for CLI logins ([#369](https://github.com/c6o/codezero/issues/369)) ([e0e24db](https://github.com/c6o/codezero/commit/e0e24dbb03d694495bf749091954e8d2cb55fa1f))
* versioning issues ([#324](https://github.com/c6o/codezero/issues/324)) ([c023be2](https://github.com/c6o/codezero/commit/c023be2f63f7c007a1816338f8a6e666d569ee66))


### Features

* add commit sha tags to helm install cmd ([#363](https://github.com/c6o/codezero/issues/363)) ([778d95a](https://github.com/c6o/codezero/commit/778d95a083bb187b40118855628a92880d25867c))
* add hub status to czctl status ([#307](https://github.com/c6o/codezero/issues/307)) ([bca9518](https://github.com/c6o/codezero/commit/bca9518892f3bc8f02ea6d7847e66d0d0327a08e))
* Added context on hub ([#342](https://github.com/c6o/codezero/issues/342)) ([b5a23ee](https://github.com/c6o/codezero/commit/b5a23ee9bdf32803a056ea34ba3bad058d8faa08))
* adjust orchestrator channels ([#345](https://github.com/c6o/codezero/issues/345)) ([27e59db](https://github.com/c6o/codezero/commit/27e59dbd4d0a2d68f9ec6ab86781dc0a709bdcc7))
* connect system to orchestrator over websockets (+shadiasocketio fix) ([#330](https://github.com/c6o/codezero/issues/330)) ([86f92d9](https://github.com/c6o/codezero/commit/86f92d940d066ae5ea0a45fba18b4ee97650c216))
* create Stripe customers when creating users/orgs ([#365](https://github.com/c6o/codezero/issues/365)) ([9e50543](https://github.com/c6o/codezero/commit/9e505436d8e38ed927e56c3e52af91f414e85669))
* czapp consume all ([#375](https://github.com/c6o/codezero/issues/375)) ([a3ca2a5](https://github.com/c6o/codezero/commit/a3ca2a5af2213e4bae533a6b3ddac92530b2d768))
* **feathers:** kill daemon when feathers socket gets disconnected ([#326](https://github.com/c6o/codezero/issues/326)) ([6eaf4a8](https://github.com/c6o/codezero/commit/6eaf4a8eda13c476aaa3e92c7e49af3c486f7589))
* get other user's profile ([2583a89](https://github.com/c6o/codezero/commit/2583a891d159eaf003d568f86f18cccaa7dc04a9))
* intercept ([#388](https://github.com/c6o/codezero/issues/388)) ([c0eb90c](https://github.com/c6o/codezero/commit/c0eb90cc2f94f00c9e13078e22be1eb1d46ba0c7))
* moved context management to hub for czapp ([#343](https://github.com/c6o/codezero/issues/343)) ([dc1b4f5](https://github.com/c6o/codezero/commit/dc1b4f5c49f81c4e6321f3ea6fa5fe49fbf793bc))
* publish svc in cluster ([#349](https://github.com/c6o/codezero/issues/349)) ([cb63eed](https://github.com/c6o/codezero/commit/cb63eed23c99c56e076e20f9e934315ad5fc0d2a))
* real-time display of service status ([#364](https://github.com/c6o/codezero/issues/364)) ([1003a6e](https://github.com/c6o/codezero/commit/1003a6efad3937fbd6812d98e94128c034cf2dd7))
* redesigned application navigation and layout ([#317](https://github.com/c6o/codezero/issues/317)) ([0296683](https://github.com/c6o/codezero/commit/02966834cfe589b9d2e0b69dbba32016b1c7dc3c))
* serve from within  czapp ([#382](https://github.com/c6o/codezero/issues/382)) ([603d80c](https://github.com/c6o/codezero/commit/603d80c9cc3729b975d2ab8487bc1694ae9a31c0))
* service catalog ([#331](https://github.com/c6o/codezero/issues/331)) ([9ece333](https://github.com/c6o/codezero/commit/9ece3331cb043c621f7990439cfb3a0bc59400b7))
* **service-catalog:** live namespaces and namespaces based filtering ([#347](https://github.com/c6o/codezero/issues/347)) ([c6a4e97](https://github.com/c6o/codezero/commit/c6a4e971b2d41e2d3bf6b4147ab46a52e50d06c7))
* update orchestrator API ([#329](https://github.com/c6o/codezero/issues/329)) ([975dbaf](https://github.com/c6o/codezero/commit/975dbaf6affd0e9bb70c801dbd2316b5e980888d))
* use context from hub in czctl and czdaemon ([#346](https://github.com/c6o/codezero/issues/346)) ([a03b0a4](https://github.com/c6o/codezero/commit/a03b0a41ecf055876a5829f05ef4faaa745942f7))

## [2.0.0-rc.2](https://github.com/c6o/codezero/compare/2.0.0-rc.1...2.0.0-rc.2) (2023-07-05)


### Bug Fixes

* fixes leaking open sockets held by never-ending `io.Copy` on UDP ([#281](https://github.com/c6o/codezero/issues/281)) ([6d65920](https://github.com/c6o/codezero/commit/6d65920d2a5bb877ecaba3c8ad02b32c0fcb5c2f))
* handle watch failures ([#267](https://github.com/c6o/codezero/issues/267)) ([b166223](https://github.com/c6o/codezero/commit/b166223e622c9c668f1080889bb4df51548d41f7))
* invites fail to send ([#272](https://github.com/c6o/codezero/issues/272)) ([ce093e6](https://github.com/c6o/codezero/commit/ce093e6a1e43755a91564d58cada4f9bd4790187))
* Prevent changes to dns.cfID ([#278](https://github.com/c6o/codezero/issues/278)) ([3e4b344](https://github.com/c6o/codezero/commit/3e4b34416c7477e3861cbd5047dce0b5b0a98457))


### Features

* add DNS flushing after changes to DNS ([#259](https://github.com/c6o/codezero/issues/259)) ([241dde9](https://github.com/c6o/codezero/commit/241dde9026e5e2bb06022948cda096720e692daa))
* Added version reporting ([#277](https://github.com/c6o/codezero/issues/277)) ([72fedfd](https://github.com/c6o/codezero/commit/72fedfd769629a08586eface703b0a8919765ac9))
* czctl status display adjustments ([#296](https://github.com/c6o/codezero/issues/296)) ([248b50d](https://github.com/c6o/codezero/commit/248b50d7b6d5a243a7a2f05bd43cb7a057e76cd9))
* direct intercept ([#255](https://github.com/c6o/codezero/issues/255)) ([8977ed6](https://github.com/c6o/codezero/commit/8977ed62d3bf42d77c52ee927cf614b475fb14d4))
* **ij:** run configs with prompts ([#262](https://github.com/c6o/codezero/issues/262)) ([78f1a7d](https://github.com/c6o/codezero/commit/78f1a7ddfe55fcad884d0331f2b0e9311d7bd676))
* support login with Google ([#283](https://github.com/c6o/codezero/issues/283)) ([4ca5c1b](https://github.com/c6o/codezero/commit/4ca5c1ba3246cd6d350887297df0c73b0b13a5fa))
* support teleport per port ([#294](https://github.com/c6o/codezero/issues/294)) ([6f5cf38](https://github.com/c6o/codezero/commit/6f5cf38cc67b6ebf751f0fc2f32e81b8576f5cf6))

## [2.0.0-rc.1](https://github.com/c6o/codezero/compare/2.0.0-rc.0...2.0.0-rc.1) (2023-06-21)


### Bug Fixes

* adjust exit codes on login ([#250](https://github.com/c6o/codezero/issues/250)) ([8300a4b](https://github.com/c6o/codezero/commit/8300a4b2d6d1991e8c81207d0754422aa5a0ca20))
* certs race on orchestrator auth service ([#257](https://github.com/c6o/codezero/issues/257)) ([8e342d3](https://github.com/c6o/codezero/commit/8e342d32432d05441fb6ae86dd9c2f0e6da76f87))
* czctl auth login redirect ([b200c9d](https://github.com/c6o/codezero/commit/b200c9d2788ccc1019076887e2627cb57b3d7a89))
* **czctl:** perform clean exit when space is not set or user is not logged in during attach commands ([#253](https://github.com/c6o/codezero/issues/253)) ([a3939ef](https://github.com/c6o/codezero/commit/a3939efb5a79e81c1e3278206d84740c6df62685))
* **czsupervisor:** fixes http handler crash when checking status and daemon is not running ([#252](https://github.com/c6o/codezero/issues/252)) ([8906a4f](https://github.com/c6o/codezero/commit/8906a4fcc79ef5d181374987735878f0e11a5f54))
* fix duplicated flags issue ([#256](https://github.com/c6o/codezero/issues/256)) ([c37bd59](https://github.com/c6o/codezero/commit/c37bd59c0ef0f641f15f67381bff15d644dadd44))
* fix missing default for DaemonListenAddr ([#258](https://github.com/c6o/codezero/issues/258)) ([28b5605](https://github.com/c6o/codezero/commit/28b5605bfb91d3d0b0290eeead136b49b8345f85))
* fixes space status when organization is selected ([#234](https://github.com/c6o/codezero/issues/234)) ([d22df81](https://github.com/c6o/codezero/commit/d22df81a29cc1750c842423371fccbcfef301482))
* fixes spinner UI clashing with UI messages ([#235](https://github.com/c6o/codezero/issues/235)) ([d560fc3](https://github.com/c6o/codezero/commit/d560fc30841c9f618ec23c06328a2b3106277cfd))
* v1.x headless install [skip ci] ([7d04b54](https://github.com/c6o/codezero/commit/7d04b548b4f7b1dcad695f1a274741110c0e84c7))


### Features

* implement file watching in marshal.File interface ([#236](https://github.com/c6o/codezero/issues/236)) ([664ade8](https://github.com/c6o/codezero/commit/664ade87183968140ec9455183d773a16e2c56a5))
* improve daemon resiliency to issues in config daemon should start irrespective of config state ([#247](https://github.com/c6o/codezero/issues/247)) ([73f1842](https://github.com/c6o/codezero/commit/73f1842dd5b81b4d3f94e9648457026aaf19be13))
* primary namespace ([#241](https://github.com/c6o/codezero/issues/241)) ([89d1c3c](https://github.com/c6o/codezero/commit/89d1c3c6086b7c6b27e41963e650fdf3c22278ff))

## [2.0.0-rc.0](https://github.com/c6o/codezero/compare/1.0.0...2.0.0-rc.0) (2023-05-27)


### Bug Fixes

* add default config path for local hub server ([#111](https://github.com/c6o/codezero/issues/111)) ([796b9e5](https://github.com/c6o/codezero/commit/796b9e5ff94d482ab93be5945f5e65db89df5c7e))
* add default config path for local orchestrator ([#112](https://github.com/c6o/codezero/issues/112)) ([2c9f18d](https://github.com/c6o/codezero/commit/2c9f18dd5150e0630d833ba9497fe165d1acacf7))
* adds schema to generated config file ([#71](https://github.com/c6o/codezero/issues/71)) ([c96d787](https://github.com/c6o/codezero/commit/c96d787757420113e0a563329fa6364b84cc0abb))
* adjust client path to spaces certification ([#107](https://github.com/c6o/codezero/issues/107)) ([6699128](https://github.com/c6o/codezero/commit/6699128bafc7a85413cda7e947cc3288367ce607))
* adjust logger, allow orchestrator multi remove ([#216](https://github.com/c6o/codezero/issues/216)) ([f285e17](https://github.com/c6o/codezero/commit/f285e179e265a97c0455476ba05d6d84469e3a11))
* adjust space user token claims ([#213](https://github.com/c6o/codezero/issues/213)) ([e828655](https://github.com/c6o/codezero/commit/e828655b6c34fd44573bfb7c4e914d7552e6d500))
* Certification display in space list ([8799821](https://github.com/c6o/codezero/commit/8799821cf217b500310203ba20f0b106cad29f70))
* change .env default to yml extension ([#108](https://github.com/c6o/codezero/issues/108)) ([97015b3](https://github.com/c6o/codezero/commit/97015b351bb8e515053b75f3d9e91f9e3545524c))
* czdaemon hubauth config ([#131](https://github.com/c6o/codezero/issues/131)) ([6f3739a](https://github.com/c6o/codezero/commit/6f3739a5d7a619fbd6d31ef9e343aa252a89ea58))
* DNS typo ([#188](https://github.com/c6o/codezero/issues/188)) ([e985bf1](https://github.com/c6o/codezero/commit/e985bf1cdc7be1c74f354f948983926f17589d14))
* Ensure owner handling ([#168](https://github.com/c6o/codezero/issues/168)) ([f29099f](https://github.com/c6o/codezero/commit/f29099fd71688321d8830d16a014c82aa0bbb4b8))
* Filter user resources on find ([edc6a08](https://github.com/c6o/codezero/commit/edc6a08151b7c4f3a1092cb7a22a2f3fcfc450d2))
* fix eslint error ([#80](https://github.com/c6o/codezero/issues/80)) ([4172ceb](https://github.com/c6o/codezero/commit/4172ceb59acd8ef9e83d337854d64b194a7b44e6))
* fixed daemon exiting right after starting ([#106](https://github.com/c6o/codezero/issues/106)) ([1eeeb8e](https://github.com/c6o/codezero/commit/1eeeb8edcf3880d0e4df34973b09558a6ebe4b79))
* fixed dns setup, backup and revert ([#134](https://github.com/c6o/codezero/issues/134)) ([baf3a6f](https://github.com/c6o/codezero/commit/baf3a6fe266736947ad431ad757532c6b2031b62))
* fixes `czdaemon configcreate --overwrite` ([#69](https://github.com/c6o/codezero/issues/69)) ([c7e95dc](https://github.com/c6o/codezero/commit/c7e95dcc0be3f345b4919fc4357b951e397bfc81)), closes [#68](https://github.com/c6o/codezero/issues/68)
* fixes czsystem hubauth config ([#132](https://github.com/c6o/codezero/issues/132)) ([89ca951](https://github.com/c6o/codezero/commit/89ca951562ba23534fd9dd80d3843000904c72b5))
* fixes default flag values overriding config values ([#133](https://github.com/c6o/codezero/issues/133)) ([c1a5dc7](https://github.com/c6o/codezero/commit/c1a5dc73c2ae544d1e42d9f84037b276b1a4a7b8))
* fixes flags not being read ([#143](https://github.com/c6o/codezero/issues/143)) ([f0593ce](https://github.com/c6o/codezero/commit/f0593ced50b71f851c085def912ab9e929372efc))
* fixes IJ run configurations ([#38](https://github.com/c6o/codezero/issues/38)) ([260df3e](https://github.com/c6o/codezero/commit/260df3e0a4af7ef5704e1107ace186313c016494)), closes [#37](https://github.com/c6o/codezero/issues/37)
* fixes panic when could not create log file ([#229](https://github.com/c6o/codezero/issues/229)) ([6c00565](https://github.com/c6o/codezero/commit/6c005653ac05daff27d27c7280d0cfde577615b4))
* Incorrect space rotate certificates ([#223](https://github.com/c6o/codezero/issues/223)) ([6be4bce](https://github.com/c6o/codezero/commit/6be4bcee38431ab47c1a1720554ec6a066c8a7d7))
* inject ui config in system ([#209](https://github.com/c6o/codezero/issues/209)) ([830b7a8](https://github.com/c6o/codezero/commit/830b7a865d1b786aaed153b63d780bcdee51d777))
* make czctl space commands use org context ([#194](https://github.com/c6o/codezero/issues/194)) ([123ebbe](https://github.com/c6o/codezero/commit/123ebbea1ad889edfe5ea16e250ce0f37cfb3934))
* make forwardmanager thread-safe ([#225](https://github.com/c6o/codezero/issues/225)) ([d31fb07](https://github.com/c6o/codezero/commit/d31fb07310f430fd3c710eea34c0399fbe429a71))
* Missing hub.url for non-prod hub ([4bfc388](https://github.com/c6o/codezero/commit/4bfc388c9a06d6724331ffcaf09083b6ddb568c0))
* oauth redirect origin resolution ([#210](https://github.com/c6o/codezero/issues/210)) ([0036ec3](https://github.com/c6o/codezero/commit/0036ec356ca7d12c0f2f962b14f00cc577c09640))
* pass flags from czctl to czdaemon as env variables ([#182](https://github.com/c6o/codezero/issues/182)) ([f5ac1e1](https://github.com/c6o/codezero/commit/f5ac1e18f3cbde8163b738d7a7b9cee62c765edd))
* pass through query on ensureOwner find ([#118](https://github.com/c6o/codezero/issues/118)) ([#119](https://github.com/c6o/codezero/issues/119)) ([aa4de07](https://github.com/c6o/codezero/commit/aa4de07534f8caf2a6c2a5b87e7b04f0c8c7a799))
* prevent czdaemon from exiting prematurely ([#73](https://github.com/c6o/codezero/issues/73)) ([775c09a](https://github.com/c6o/codezero/commit/775c09a2ebb32995bbbea85734556c614fe0f9b7)), closes [#72](https://github.com/c6o/codezero/issues/72)
* remove deps cycle ([#148](https://github.com/c6o/codezero/issues/148)) ([545ab5e](https://github.com/c6o/codezero/commit/545ab5e614d7f9fdace1f4b83370976ddd5f3119))
* remove dynamic import for oauth profile mappers ([#109](https://github.com/c6o/codezero/issues/109)) ([4c36c5b](https://github.com/c6o/codezero/commit/4c36c5b45d079d106710ab56849a6cb23ace6314))
* small fix to hub tf deployment ([#159](https://github.com/c6o/codezero/issues/159)) ([01602aa](https://github.com/c6o/codezero/commit/01602aa43c0bd78780943b497be0008925c343b9))
* Space certification auth issue ([cf9f27a](https://github.com/c6o/codezero/commit/cf9f27ad587fd5e0e2b632b06381f9b753c0223d))
* temporarily set default audience for user space token ([#214](https://github.com/c6o/codezero/issues/214)) ([976e416](https://github.com/c6o/codezero/commit/976e416c24423d88b9548995064cb45cbfafae10))
* tests for czdaemon ([#147](https://github.com/c6o/codezero/issues/147)) ([69a3694](https://github.com/c6o/codezero/commit/69a3694ed5df91bc555e2ed2fd63ea07d6aa681a))


### Features

* add --id flag support to spaces ([#193](https://github.com/c6o/codezero/issues/193)) ([ec6cd35](https://github.com/c6o/codezero/commit/ec6cd356e3957a0e97d472cd3801271c9987fae6))
* add attach command ([#135](https://github.com/c6o/codezero/issues/135)) ([837dfa3](https://github.com/c6o/codezero/commit/837dfa32826f0e78c9494cbaed08853fcbed3c3f))
* add commands to czdaemon ([#50](https://github.com/c6o/codezero/issues/50)) ([3d50b86](https://github.com/c6o/codezero/commit/3d50b862b5305cd9a433ac2b22cf4d730073fd7e))
* add dev cluster setup scripts ([#42](https://github.com/c6o/codezero/issues/42)) ([f28127d](https://github.com/c6o/codezero/commit/f28127d953c66890b7f3ac716e4d5695901f2ecf))
* add hub token refresh ([#130](https://github.com/c6o/codezero/issues/130)) ([aa1224c](https://github.com/c6o/codezero/commit/aa1224cd7ea529b3ae4ea573e552b526a7f870dd))
* add inspect-brk configs ([#115](https://github.com/c6o/codezero/issues/115)) ([2cc86ba](https://github.com/c6o/codezero/commit/2cc86baac63ff2520bc77ef488b80218d0b07614))
* add support for more domains on forwarder ([#175](https://github.com/c6o/codezero/issues/175)) ([#231](https://github.com/c6o/codezero/issues/231)) ([aaa4774](https://github.com/c6o/codezero/commit/aaa47747fb69aa34ddddeea443876c2c6b693d4c))
* add tls in http connect ([#116](https://github.com/c6o/codezero/issues/116)) ([ec75e3b](https://github.com/c6o/codezero/commit/ec75e3b198d19077f0dd3ee794e92d7884519c5c))
* Add tunnel authentication ([#129](https://github.com/c6o/codezero/issues/129)) ([6759386](https://github.com/c6o/codezero/commit/67593862b45238f4a0e5cd69f36d0cf276cd56f2))
* add ui results to daemonctl ([#190](https://github.com/c6o/codezero/issues/190)) ([509ee5e](https://github.com/c6o/codezero/commit/509ee5e9b6c2c510b2ad5d5c2cf633d9a36b5ed8))
* added .nvmrc to define project's base node version ([#39](https://github.com/c6o/codezero/issues/39)) ([f157fba](https://github.com/c6o/codezero/commit/f157fba093d54a14b3e5c4cddbc5270c29a9bda7))
* added option to (re-)create empty config file ([#45](https://github.com/c6o/codezero/issues/45)) ([b7e0c1c](https://github.com/c6o/codezero/commit/b7e0c1c2a6c281f7a104ae82bec06fbcae8515bf))
* Added RSA token handling on hub ([#77](https://github.com/c6o/codezero/issues/77)) ([5b8dd03](https://github.com/c6o/codezero/commit/5b8dd0371b2eb8d7d69d3d47d09caba125e05ec0)), closes [#76](https://github.com/c6o/codezero/issues/76)
* adjust czdaemon cli to czctl cli ([#171](https://github.com/c6o/codezero/issues/171)) ([c1e4cd6](https://github.com/c6o/codezero/commit/c1e4cd65724150066e356ce11b6f7b7e70584e64))
* adjust error handling for rest transport ([#208](https://github.com/c6o/codezero/issues/208)) ([d57b47d](https://github.com/c6o/codezero/commit/d57b47d7114afc78409fa0fa50d2401f5820636f))
* Basic and working hub ([#57](https://github.com/c6o/codezero/issues/57)) ([247e1dd](https://github.com/c6o/codezero/commit/247e1dd7804ba25a587dc00afd004feb89c99cf8))
* Changed develop zone to tmsp.ac. Added space.dns.host ([#187](https://github.com/c6o/codezero/issues/187)) ([78db195](https://github.com/c6o/codezero/commit/78db195aba8a6f9cfee5b53cec1fb883cf865092))
* Context and policies in frontend ([#149](https://github.com/c6o/codezero/issues/149)) ([1a040c8](https://github.com/c6o/codezero/commit/1a040c82d36f12512a88bc753645ef0e6e4eb791))
* Copy  helm install instructions ([#173](https://github.com/c6o/codezero/issues/173)) ([9e83c2b](https://github.com/c6o/codezero/commit/9e83c2bcb91d284711b7f78b827c99710ea37ca6))
* create Iif method for simplifying certain conditional cases ([#181](https://github.com/c6o/codezero/issues/181)) ([a4d63e2](https://github.com/c6o/codezero/commit/a4d63e269c7dc08c076344ca738cc90986460718))
* create UI for non-interactive terminals ([#183](https://github.com/c6o/codezero/issues/183)) ([bda0cb9](https://github.com/c6o/codezero/commit/bda0cb93e96d06621ee3206f1aeefc966bcb858f))
* czctl organization commands [#155](https://github.com/c6o/codezero/issues/155) ([#167](https://github.com/c6o/codezero/issues/167)) ([70875c0](https://github.com/c6o/codezero/commit/70875c0f0ce14f8e4bdbce5f30a17e5533795203))
* czctl should write to user on stdout ([#170](https://github.com/c6o/codezero/issues/170)) ([ac2bd9c](https://github.com/c6o/codezero/commit/ac2bd9caa14f52ab790adaa61b76d7f3f367fea4))
* czdaemon & czsystem prototype with Nx ([#34](https://github.com/c6o/codezero/issues/34)) ([fd3e95e](https://github.com/c6o/codezero/commit/fd3e95e413c494a4649b7c562cac9ca9c75e5428)), closes [#11](https://github.com/c6o/codezero/issues/11) [#12](https://github.com/c6o/codezero/issues/12) [#12](https://github.com/c6o/codezero/issues/12) [#11](https://github.com/c6o/codezero/issues/11) [#12](https://github.com/c6o/codezero/issues/12) [#23](https://github.com/c6o/codezero/issues/23)
* czsystem registry and authentication ([#76](https://github.com/c6o/codezero/issues/76)) ([3ef6e96](https://github.com/c6o/codezero/commit/3ef6e963e791592e54f94b4bf94f6b289080af9f))
* do not throw on reading the file that is missing (by default), just return empty struct instead ([#163](https://github.com/c6o/codezero/issues/163)) ([047e91c](https://github.com/c6o/codezero/commit/047e91c6340de4e64eb65417c129e1ce068c56a8))
* ensure auth when `czctl start` is called ([#205](https://github.com/c6o/codezero/issues/205)) ([e01ba9e](https://github.com/c6o/codezero/commit/e01ba9e8b96b9df03d915698f29fbface6b88a25))
* feathers go client rest transport ([#140](https://github.com/c6o/codezero/issues/140)) ([3ee8853](https://github.com/c6o/codezero/commit/3ee8853b277a4d734d707e9994787e33506c0765))
* HUB handle DNS update from spaces ([#158](https://github.com/c6o/codezero/issues/158)) ([28e5b6d](https://github.com/c6o/codezero/commit/28e5b6d7b502c538897e5205edeb2fa77ca30a97)), closes [#90](https://github.com/c6o/codezero/issues/90)
* implement `czctl auth login --token` ([#177](https://github.com/c6o/codezero/issues/177)) ([e55069d](https://github.com/c6o/codezero/commit/e55069d8f78c59b313c23213b242147f760342fe))
* implement czctl login with oauth from hub ([#138](https://github.com/c6o/codezero/issues/138)) ([83cff9f](https://github.com/c6o/codezero/commit/83cff9f7eaecd5af39c9094fb2761c5b85f447b6))
* implement czctl status command ([#144](https://github.com/c6o/codezero/issues/144)) ([c5c6a42](https://github.com/c6o/codezero/commit/c5c6a42c0bf0227134b05d2c1d7482619a36de44))
* implement daemonization ([#47](https://github.com/c6o/codezero/issues/47)) ([#66](https://github.com/c6o/codezero/issues/66)) ([b5ba1bb](https://github.com/c6o/codezero/commit/b5ba1bb1c25e248f025da8e236367970239fa80b))
* implement spaces certificates ([#83](https://github.com/c6o/codezero/issues/83)) ([#92](https://github.com/c6o/codezero/issues/92)) ([849c5a8](https://github.com/c6o/codezero/commit/849c5a8bde4037a3dd96cf2f9ae232fb9723e7ae))
* implements start, stop and restart command in czctl ([#142](https://github.com/c6o/codezero/issues/142)) ([372d9e7](https://github.com/c6o/codezero/commit/372d9e78a27eba43359b364eb6d5683bc649ca4f))
* make elevated commands respect sudo's caller when creating new files and directories ([#227](https://github.com/c6o/codezero/issues/227)) ([2a82986](https://github.com/c6o/codezero/commit/2a8298610524faf8097308549f440aa4cfd7bc2c))
* manage teleport rules in orchestrator session ([#215](https://github.com/c6o/codezero/issues/215)) ([15d4efd](https://github.com/c6o/codezero/commit/15d4efdbabefdff5511c3f3b9508bd24cf9803c2))
* new status, less root, other fixes and improvements ([#220](https://github.com/c6o/codezero/issues/220)) ([d6bf5a8](https://github.com/c6o/codezero/commit/d6bf5a83db5c7c9b2acdd2ee086545a28482f687))
* observe the cluster state and send changes via ctrl ([#13](https://github.com/c6o/codezero/issues/13)) ([#49](https://github.com/c6o/codezero/issues/49)) ([0ab1db8](https://github.com/c6o/codezero/commit/0ab1db8aa3cd534a179cb66c5ef19684ab712454))
* pass logger to feathers client ([#151](https://github.com/c6o/codezero/issues/151)) ([f1a1113](https://github.com/c6o/codezero/commit/f1a1113c13c99c2342602941fcdc70c2346d60be))
* pull request CI [#150](https://github.com/c6o/codezero/issues/150) ([ed08244](https://github.com/c6o/codezero/commit/ed08244ee7d316e2a6b23c739da3f1b43195ba82))
* RBAC and Policy based authorization ([#139](https://github.com/c6o/codezero/issues/139)) ([db9e7f9](https://github.com/c6o/codezero/commit/db9e7f9a2a929cb3c91392a82dd8857f4fc802b0))
* refactor czproxy to dargo di ([#60](https://github.com/c6o/codezero/issues/60)) ([a5052bc](https://github.com/c6o/codezero/commit/a5052bc33e54a4f1538dcf27f409b7a434ae5ce9)), closes [#58](https://github.com/c6o/codezero/issues/58)
* refactor czsystem to use dargo ([#54](https://github.com/c6o/codezero/issues/54)) ([82a095f](https://github.com/c6o/codezero/commit/82a095f6331c473c2d62ced07a654a6708713855))
* refactor tunnel into common http handler ([#10](https://github.com/c6o/codezero/issues/10)) ([#46](https://github.com/c6o/codezero/issues/46)) ([f8fb1f9](https://github.com/c6o/codezero/commit/f8fb1f93dd077af98d24b4c0ae68911cf801131e))
* refactored logging and flags ([#207](https://github.com/c6o/codezero/issues/207)) ([f54f54b](https://github.com/c6o/codezero/commit/f54f54b72c3a5f6811a7022d66427c8787acc26c))
* register the space host in hub by system on lb changes ([#176](https://github.com/c6o/codezero/issues/176)) ([819377d](https://github.com/c6o/codezero/commit/819377da304aefc05353846f55fb460f5c573f48))
* remove spaces and tokens on logout ([#179](https://github.com/c6o/codezero/issues/179)) ([efa9887](https://github.com/c6o/codezero/commit/efa9887b5dfc706ba9d51ad6b4dfc84fc907c898))
* restore the previous yarn.lock ([#164](https://github.com/c6o/codezero/issues/164)) ([ef8189c](https://github.com/c6o/codezero/commit/ef8189c7daa20b8cbb11e811722fa32587b7f35e))
* save space cert to space config file ([#124](https://github.com/c6o/codezero/issues/124)) ([2163771](https://github.com/c6o/codezero/commit/21637712808ca91e1cbab86e2b5c654f1642d0f4))
* secure ws connection to orchestrator ([#160](https://github.com/c6o/codezero/issues/160)) ([1e5a9ca](https://github.com/c6o/codezero/commit/1e5a9ca8d5856a71bf39a4f54744469572936978))
* small improvements to e2e test script ([#74](https://github.com/c6o/codezero/issues/74)) ([d537e48](https://github.com/c6o/codezero/commit/d537e48873899889028be895a74398bdb6c5a475))
* teleport all ([#128](https://github.com/c6o/codezero/issues/128)) ([387d7cc](https://github.com/c6o/codezero/commit/387d7ccb6043360a20a83735013d8856c5206ef1))
* teleport all ([#137](https://github.com/c6o/codezero/issues/137)) ([6b8d348](https://github.com/c6o/codezero/commit/6b8d34843f8e6c89d71eb66eb4f7060a48158486))
* teleport e2e tests ([d45dcc6](https://github.com/c6o/codezero/commit/d45dcc68f2bf643c73a4d6e792fed5e0c599f871))
* teleport rules ([#218](https://github.com/c6o/codezero/issues/218)) ([743f640](https://github.com/c6o/codezero/commit/743f6407886e7a1fa5c046a9e269152bcdc22f67))
* use feathers client for hub communication ([#157](https://github.com/c6o/codezero/issues/157)) ([fb218f0](https://github.com/c6o/codezero/commit/fb218f09a018de24afecebc6c47900c714597497))
* use kubefwd instead of port-forward for dev-cluster integration ([#52](https://github.com/c6o/codezero/issues/52)) ([0babe51](https://github.com/c6o/codezero/commit/0babe51bdb9a27634ae517b9e36cb16cc5c1c0c4))
* use space id instead of space name in space config context ([#180](https://github.com/c6o/codezero/issues/180)) ([43fe5e7](https://github.com/c6o/codezero/commit/43fe5e7ca35324f614c303dfcc57b1519853cfd3))
* various improvements ([#113](https://github.com/c6o/codezero/issues/113)) ([379a4cc](https://github.com/c6o/codezero/commit/379a4cc883c2897eef1075ea05168e482a5ba1a3))