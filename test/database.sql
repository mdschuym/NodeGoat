CREATE TABLE `sys_feature_flags` (
  `sys_group_id` int NOT NULL,
  `id` int UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL default -1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `sys_feature_flags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique` (`sys_group_id`,`name`),
  ADD KEY `covered` (`sys_group_id`,`name`,`value`),
  ADD KEY `covered_2` (`sys_group_id`,`name`);

ALTER TABLE `sys_feature_flags`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;



