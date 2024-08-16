<?php

namespace App\Core\Infrastructure\Sulu;

use Sulu\Component\Rest\ListBuilder\Doctrine\DoctrineListBuilder;
use Sulu\Component\Rest\ListBuilder\ListBuilderInterface;
use Symfony\Component\Uid\AbstractUid;
use Symfony\Component\Uid\Uuid;

class UuidDoctrineListBuilder extends DoctrineListBuilder
{
    /**
     * @param string[]|int[]|null $ids
     */
    public function setIds($ids): ListBuilderInterface
    {
        return parent::setIds($this->mapUuids($ids));
    }

    /**
     * @param string[]|int[]|null $excludedIds
     */
    public function setExcludedIds($excludedIds): ListBuilderInterface
    {
        return parent::setExcludedIds($this->mapUuids($excludedIds));
    }

    /**
     * @return string[]|int[]|null
     */
    protected function findIdsByGivenCriteria(): ?array
    {
        $ids = parent::findIdsByGivenCriteria();

        return $this->mapUuids($ids);
    }

    /**
     * @param string[]|int[]|null $ids
     *
     * @return string[]|int[]|null
     */
    private function mapUuids(?array $ids): ?array
    {
        if (is_null($ids)) {
            return null;
        }

        return array_map(function ($id) {
            return match (gettype($id)) {
                'string' => Uuid::isValid($id) ? Uuid::fromString($id)->toBinary() : $id,
                // @phpstan-ignore-next-line
                'object' => $id instanceof AbstractUid ? $id->toBinary() : $id,
                default => $id,
            };
        }, $ids);
    }
}
